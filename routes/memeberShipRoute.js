const express = require('express')
const router = express.Router();

const { getProducts , membership , membershipVerification , getMemberShipDetails } = require("../controllers/memberShip.js")
const { isUser } = require("../middlewares/isUser")

router.route('/getproducts').get(getProducts);
router.route("/razorpay/:productId").get(membership)
router.route("/membershipVerification").post(membershipVerification)
router.route("/getmembershipdetails").get(isUser , getMemberShipDetails)

module.exports = router;