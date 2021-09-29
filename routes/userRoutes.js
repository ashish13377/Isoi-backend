const express = require('express')
const router = express.Router();
const { registerUser , loginUser } = require("../controllers/userControllers.js")
const uploadMulter = require("../middlewares/uploads.js");

router.route('/register').post(uploadMulter,  registerUser);
router.route('/login').post(loginUser);


module.exports = router;