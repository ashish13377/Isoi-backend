const express = require('express')
const router = express.Router();
const { registerUser , loginUser , FreeEventRegistration , paidEventRegistration , getmyfreeevents , getmypaidevents } = require("../controllers/userControllers.js")
const uploadMulter = require("../middlewares/uploads.js");
const { isUser } = require("../middlewares/isUser.js")

router.route('/register').post(uploadMulter,  registerUser);
router.route('/login').post(loginUser);
router.route('/free-events-registration/:id').put(isUser , FreeEventRegistration);
router.route('/paid-events-registration/:id').put(isUser , paidEventRegistration);
router.route("/getmyfree-event").get(isUser , getmyfreeevents)
router.route("/getmypaid-event").get(isUser , getmypaidevents)



module.exports = router;