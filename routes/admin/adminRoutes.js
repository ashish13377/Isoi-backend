const express = require('express')
const router = express.Router();
const { registerUser , loginUser , membershipEvent , freeEvent , getFreeEvents , getMembershipEvents} = require("../../controllers/admin/adminControllers.js")
const posterMulter = require("../../middlewares/posterUpload.js");

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route("/membershipevent").post(posterMulter , membershipEvent)
router.route("/free-event").post(posterMulter , freeEvent)
router.route("/allfree-event").get(getFreeEvents)
router.route("/allmembershipevent").get(getMembershipEvents)


module.exports = router;