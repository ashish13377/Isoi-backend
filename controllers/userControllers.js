const jwt = require("jsonwebtoken");
const User = require("../config/models/user.js");
const bcrypt = require("bcrypt")
const FreeEvent = require("../config/models/admin/freeEvent.js")
const MemberShipEvent = require("../config/models/admin/membershipEvent")
const FreeEventsRegistrations = require("../config/models/freeEventsRegistrations.js");
const PaidEventsRegistrations = require("../config/models/paidEventsRegistration.js");


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
        const { fname, mname, lname, phone, wpNumber, department } = req.body;

        FreeEvent.findByIdAndUpdate(req.params.id, {
            $push: { attende: req.user._id }
        }, {
            new: true
        }).exec((err , res) => {
            if(err){
                console.log(err);
            }else{
                console.log("ok");
            }
        })

        const details = new FreeEventsRegistrations({ fname, mname, lname, email : req.user.email, phone, wpNumber, department, user: req.user._id, eventId: req.params.id })

        if (await details.save()) {
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
        const { fname, mname, lname, phone, wpNumber, department } = req.body;

        MemberShipEvent.findByIdAndUpdate(req.params.id, {
            $push: { attende: req.user._id }
        }, {
            new: true
        }).exec((err , res) => {
            if(err){
                console.log(err);
            }else{
                console.log("ok");
            }
        })
        

        const details = new PaidEventsRegistrations({ fname, mname, lname, email : req.user.email, phone, wpNumber, department, user: req.user._id, eventId: req.params.id })

        if (await details.save()) {
            res.status(201).json({ message: "Register successfully!" })
        } else {
            res.status(401).json({ error: "Something went wrong!" })

        }



    } catch (error) {
        console.log(error);
    }

}


module.exports = { registerUser, loginUser, FreeEventRegistration , paidEventRegistration };