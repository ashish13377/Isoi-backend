const jwt = require("jsonwebtoken");
const User = require("../config/models/user.js");
const bcrypt = require("bcrypt")


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
                const token = jwt.sign({ _id: userLogin._id }, "thisisisoistudentchapterofhitkkolkata");
                res.status(200).json({ message: "User Login Succesfully!", userLogin, token });
            }
        } else {
            res.status(422).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(422).json({ error });
    }

}


module.exports = { registerUser, loginUser };