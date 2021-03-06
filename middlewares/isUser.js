const jwt = require("jsonwebtoken");

const User = require("../config/models/user.js");

const isUser = async (req,res,next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "You Must be Logged in" });
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_TOKEN, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You Must be Logged in" })
        }

        const { _id } = payload;

        User.findById(_id).then(userData => {
            req.user = userData;
            next();
        })
    })
}


module.exports = { isUser }