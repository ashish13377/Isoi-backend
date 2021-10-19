const jwt = require("jsonwebtoken");
const User = require("../config/models/user.js");
const bcrypt = require("bcrypt")
const FreeEvent = require("../config/models/admin/freeEvent.js")
const MemberShipEvent = require("../config/models/admin/membershipEvent")
const FreeEventsRegistrations = require("../config/models/freeEventsRegistrations.js");
const PaidEventsRegistrations = require("../config/models/paidEventsRegistration.js");
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
    const picture = (req.file) ? req.file.filename : null;
    const { name, phone, email, username, password, cfpassword } = req.body;

    if (!name || !email || !password || !username || !cfpassword || !phone) {
        res.status(422).json({ error: "Plz Enter all Field Provided" })
    }

    try {
        const userExist = await User.findOne({ email: email })
        const isUsername = await User.findOne({ username: username })

        if (userExist || isUsername) {
            res.status(422).json({ error: "User already Exist" });
        } else if (password != cfpassword) {
            res.status(422).json({ error: "Password not matching" });
        }
        else {
            const user = new User({ name, phone, email, username, picture, password, cfpassword });
            await user.save();

            res.status(201).json({ message: "User Registered Succesfully" })
        }

    } catch (error) {
        console.log(error);
    }

}



const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            res.status(422).json({ error: "Plz Enter all filed" });
        }

        const userLogin = await User.findOne({ username: username });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(422).json({ error: "Invalid Credentials" });
            } else {
                userLogin.password = undefined;
                userLogin.cfpassword = undefined;
                const token = jwt.sign({ _id: userLogin._id }, process.env.JWT_TOKEN);
                res.status(200).json({ message: "User Login Succesfully!", userLogin, token });
            }
        } else {
            res.status(422).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(422).json({ error });
    }

}

const FreeEventRegistration = async (req, res) => {
    try {
        const { fname, mname, lname, phone, wpNumber, department , eventName , eventDate } = req.body;
        console.log(eventDate);

        FreeEvent.findByIdAndUpdate(req.params.id, {
            $push: { attende: req.user._id }
        }, {
            new: true
        }).exec((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("ok");
            }
        })



        const details = new FreeEventsRegistrations({ fname, mname, lname, email: req.user.email, phone, wpNumber, department, user: req.user._id, eventId: req.params.id , eventName , eventDate })

        if (await details.save()) {

            const output = `
            <h4> Dear student </h4>
            <h5>Greetings from ISOI-student chapter,HITK. </h5>
            <p>
            Thank You for successfully registering for the Event. <br>
            <p> Event Name : ${eventName} <br>
                Event Date : ${eventDate} <br>
            <br>
            <p>We are looking forward for your presence.</p>

            <br>
            <br>
            best wishes, <br>
            Team-ISOI-student chapter,HITK.</p>
       `
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "projectsmail1504@gmail.com", // generated ethereal user
                    pass: "sulrsngrrqkfyppm", // generated ethereal password
                },
            });

            let mailOption = {
                from: 'projectsmail1504@gmail.com', // sender address
                to: req.user.email, // list of receivers
                subject: "ISOI-HITK Event Registration", // Subject line
                text: "ISOI-HITK Event Registration", // plain text body
                html: output, // html body
            }

            // send mail with defined transport object
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    res.json(error)
                } else {
                    const data = info.messageId;
                    res.json({ message: "Email sent", data })
                }
            });

            res.status(201).json({ message: "Register successfully!" })

        } else {
            res.status(401).json({ error: "Something went wrong!" })

        }



    } catch (error) {
        console.log(error);
    }

}
const paidEventRegistration = async (req, res) => {
    try {
        const { fname, mname, lname, phone, wpNumber, department , eventDate , eventName } = req.body;

        MemberShipEvent.findByIdAndUpdate(req.params.id, {
            $push: { attende: req.user._id }
        }, {
            new: true
        }).exec((err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("ok");
            }
        })


        const details = new PaidEventsRegistrations({ fname, mname, lname, email: req.user.email, phone, wpNumber, department, user: req.user._id, eventId: req.params.id ,  eventDate , eventName })

        if (await details.save()) {

            const output = `
            <h4> Dear student </h4>
            <h5>Greetings from ISOI-student chapter,HITK. </h5>
            <p>
            Thank You for successfully registering for the Event. <br>

            <br>
            <p>We are looking forward for your presence.</p>

            <br>
            <br>
            best wishes, <br>
            Team-ISOI-student chapter,HITK.</p>
       `
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "projectsmail1504@gmail.com", // generated ethereal user
                    pass: "sulrsngrrqkfyppm", // generated ethereal password
                },
            });

            let mailOption = {
                from: 'projectsmail1504@gmail.com', // sender address
                to: req.user.email, // list of receivers
                subject: "ISOI-HITK Event Registration", // Subject line
                text: "ISOI-HITK Event Registration", // plain text body
                html: output, // html body
            }

            // send mail with defined transport object
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    res.json(error)
                } else {
                    const data = info.messageId;
                    res.json({ message: "Email sent", data })
                }
            });

            res.status(201).json({ message: "Register successfully!" })
        } else {
            res.status(401).json({ error: "Something went wrong!" })

        }



    } catch (error) {
        console.log(error);
    }

}


const getmyfreeevents = async(req,res) => {
    const eventfree = await FreeEventsRegistrations.find({user : req.user._id});
    res.status(200).json(eventfree)
}
const getmypaidevents = async(req,res) => {
    const eventpaid = await PaidEventsRegistrations.find({user : req.user._id});
    res.status(200).json(eventpaid)
}


module.exports = { registerUser, loginUser, FreeEventRegistration, paidEventRegistration , getmyfreeevents , getmypaidevents};