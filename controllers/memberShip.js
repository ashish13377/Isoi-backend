const { products } = require("./data/data.js")
const Razorpay = require("razorpay")
const shortid = require("shortid");
const crypto = require("crypto")
const hmac_sha256 = require("crypto-js/hmac-sha256");
const MemberShip = require("../config/models/membership/membership.js")
const PayStats = require("../config/models/membership/paymentStats")
const Members = require("../config/models/membership/members.js")

const razorpay = new Razorpay({
    key_id: process.env.RZP_KEY,
    key_secret: process.env.RZP_KEY_SECRET
})

const getProducts = (req, res) => {
    res.status(200).json(products)
}

const membership = (req, res) => {
    const { productId } = req.params
    const product = products.find(product => product.id == productId);
    const amount = product.price * 100;
    const currency = "INR";
    //receipt generated unique from database
    const receipt = shortid.generate();
    const notes = { name: product.name, desc: product.desc };
    const payment_capture = 1;

    razorpay.orders.create({ amount, currency, receipt, notes, payment_capture }, (error, order) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(order);
    })
}

const membershipVerification = async (req, res) => {
    //do validation

    try {
        const SECERT = process.env.RZP_SECRET;

        const stats = req.body;

        const shasum = crypto.createHmac('sha256', SECERT);
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')

        // console.log(digest, req.headers['x-razorpay-signature']);

        if (digest === req.headers['x-razorpay-signature']) {
            const email = stats.payload.payment.entity.email;
            const account_id = stats.account_id;
            const event = stats.event;
            const paymentId = stats.payload.payment.entity.id;
            const paymentAmount = stats.payload.payment.entity.amount;
            const status = stats.payload.payment.entity.status
            const orderId = stats.payload.payment.entity.order_id
            const createdAt = stats.payload.payment.entity.created_at
            const method = stats.payload.payment.entity.method

            if (method === 'upi') {
                const upi_transaction_id = stats.payload.payment.entity.acquirer_data.upi_transaction_id
                const upiNetwork = stats.payload.payment.entity.vpa

                const paymentStatement = new MemberShip({
                    account_id, event, paymentId, paymentAmount, status, orderId, email, createdAt, method, upiNetwork, upi_transaction_id
                })
                await paymentStatement.save();

            } else {
                const card_id = stats.payload.payment.entity.card_id
                const cardNetwork = stats.payload.payment.entity.card.network;

                const paymentStatement = new MemberShip({
                    account_id, event, paymentId, paymentAmount, status, orderId, email, createdAt, method, card_id, cardNetwork
                })
                await paymentStatement.save();
            }
            console.log("req is legit");
        } else {
            res.status(502).json({ error: "something wrong!" })

        }


        res.json({ status: "ok" })

    } catch (error) {
        res.json({ status: "ok" })
    }


}



const verifyPayment = async (req, res) => {

    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const key_secret = process.env.RZP_KEY_SECRET;

        const generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, key_secret).toString();
        if (generated_signature === razorpay_signature) {
            const data = new PayStats({ user: req.user._id, userEmail: req.user.email, userPhone: req.user.phone, razorpay_payment_id, razorpay_order_id, razorpay_signature })
            await data.save();
            res.status(200).json({ message: "Payment received is from an authentic source." })
        } else {
            res.json({ error: "Payment verification failed!" })
        }

    } catch (error) {
        res.json(error)
    }

}


const addMembers = async (req, res) => {
    const { fName, mName , lName , birthData, gender, email, phone, wpNumber, year, autonomyRoll, collegeRoll, attendAnyEvent, feedback, image, address, city, state, postalCode } = req.body;

    try {

        // if (!fName || !lName || !birthData || !gender || !wpNumber || !phone || !email || !year || !autonomyRoll || !collegeRoll || !attendAnyEvent || !feedback || !image || !address || !city || !state || !postalCode) {
        //     res.status(422).json({ error: "Please fill all fields provided!" })
        // } else {
            const isMember = await MemberShip.findOne({ email: email });
            // const isCapture = isMember.status;
            if (isMember && isMember.status === "captured") {
                const amount = isMember.paymentAmount;
                if (amount === 40000) {
                    const duration = 4;
                    const member = new Members({ fName, mName , lName, birthData, gender, email, phone, wpNumber, year, duration, autonomyRoll, collegeRoll, attendAnyEvent, feedback, image, address, city, state, postalCode, isMember: true, user: req.user._id });
                    await member.save();
                    res.status(201).json({ message: "Membership activated!" })
                } else {
                    const duration = 1;
                    const member = new Members({ fName, mName , lName: req.user.name, birthData, gender, email: req.user.email, phone: req.user.phone, wpNumber, year, duration, autonomyRoll, collegeRoll, attendAnyEvent, feedback, image, address, city, state, postalCode, isMember: true, user: req.user._id });
                    await member.save();
                    res.status(201).json({ message: "Membership activated!" })
                }

            } else {
                res.status(400).json({ error: "First get your membership!" })
            }

        // }
    } catch (error) {
        console.log(error)
    }

}


const getMember = async (req, res) => {
    const isMember = await Members.findOne({ user: req.user._id });
    if (isMember) {
        res.status(200).json(isMember);
    } else {
        res.status(400).json({ error: "Not member" })
    }
}



module.exports = { getProducts, membership, membershipVerification, verifyPayment, addMembers, getMember };