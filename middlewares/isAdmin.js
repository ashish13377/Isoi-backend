const jwt = require("jsonwebtoken");

const Admin = require("../config/models/admin/user.js");

const isAdmin = async (req,res,next) => {
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

        Admin.findById(_id).then(userData => {
            req.user = userData;
            //// console.log(req.user);
            next();
        })
    })
}


module.exports = { isAdmin }