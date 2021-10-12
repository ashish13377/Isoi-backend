const jwt = require("jsonwebtoken");
const Admin = require("../../config/models/admin/user.js");
const MemberShipEvent = require("../../config/models/admin/membershipEvent.js")
const FreeEvent = require("../../config/models/admin/freeEvent.js")
const bcrypt = require("bcrypt")


const registerUser = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !password || !username) {
        res.status(422).json({ error: "Plz Enter all Field Provided" })
    }

    try {
        const isUsername = await Admin.findOne({ username: username })

        if (isUsername) {
            res.status(422).json({ error: "User already Exist" });
        }
        else {
            const user = new Admin({ name, username, password });
            await user.save();

            res.status(201).json({ message: "User Registered Succesfully" })
        }

    } catch (error) {
        res.status(422).json(error)
    }

}


const loginUser = async (req, res) => {

    const { username, password } = req.body;
    try {
        if (!username || !password) {
            res.status(422).json({ error: "Plz Enter all filed" });
        }

        const userLogin = await Admin.findOne({ username: username });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(422).json({ error: "Invalid Credentials" });
            } else {
                userLogin.password = undefined;
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

const membershipEvent = async (req, res) => {
    const eventPoster = (req.file) ? req.file.filename : null;

    const { eventName, eventDescription, eventDate, eventTime, venue, contactName, contactEmail, contactPhone, contactDesignation } = req.body;



    try {
        if (!eventName || !eventDescription || !eventDate || !eventTime || !venue || !contactName || !contactEmail || !contactPhone || !contactDesignation) {
            res.status(422).json({ error: "Plz Enter all Field Provided" })
        } else {
            const mEvenet = new MemberShipEvent({ eventName, eventDescription, eventPoster, eventDate, eventTime, venue, contactName, contactEmail, contactPhone, contactDesignation })
            await mEvenet.save();
            res.status(201).json({ message: "Event Created succesfully!" });
        }
    } catch (error) {

    }
}

const freeEvent = async (req, res) => {
    const eventPoster = (req.file) ? req.file.filename : null;

    const { eventName, eventDescription, eventDate, eventTime, venue, contactName, contactEmail, contactPhone, contactDesignation } = req.body;



    try {
        if (!eventName || !eventDescription || !eventDate || !eventTime || !venue || !contactName || !contactEmail || !contactPhone || !contactDesignation) {
            res.status(422).json({ error: "Plz Enter all Field Provided" })
        } else {
            const mEvenet = new FreeEvent({ eventName, eventDescription, eventPoster, eventDate, eventTime, venue, contactName, contactEmail, contactPhone, contactDesignation })
            await mEvenet.save();
            res.status(201).json({ message: "Event Created succesfully!" });
        }
    } catch (error) {

    }
}

const getFreeEvents = async (req, res) => {
    const fEvent = await FreeEvent.find()
    res.status(200).json(fEvent);
}

const getMembershipEvents = async (req, res) => {
    const mEvent = await MemberShipEvent.find()
    res.status(200).json(mEvent);
}

module.exports = { registerUser, loginUser, membershipEvent, freeEvent, getFreeEvents, getMembershipEvents };