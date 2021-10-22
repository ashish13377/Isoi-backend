const express = require('express')
const router = express.Router();
const { registerUser , loginUser , membershipEvent , freeEvent , getFreeEvents , getMembershipEvents , getFreeEvenetsById , getMemberShipEvenetsById , getFreeEventMemberDetails , getPaidEventMemberDetails} = require("../../controllers/admin/adminControllers.js")
const posterMulter = require("../../middlewares/posterUpload.js");
const { isAdmin } = require("../../middlewares/isAdmin.js");

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route("/membershipevent").post(isAdmin , posterMulter , membershipEvent)
router.route("/free-event").post(isAdmin, posterMulter , freeEvent)
router.route("/allfree-event").get(getFreeEvents)
router.route("/allmembershipevent").get(getMembershipEvents)
router.route("/freeevent/:id").get(getFreeEvenetsById)
router.route("/paidevent/:id").get(getMemberShipEvenetsById)
router.route("/getfree-event-members").get(isAdmin , getFreeEventMemberDetails)
router.route("/getpaid-event-members").get(isAdmin , getPaidEventMemberDetails)


module.exports = router;