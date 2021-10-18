const express = require('express')
const router = express.Router();

const { getProducts , membership , membershipVerification , verifyPayment , addMembers , getMember} = require("../controllers/memberShip.js")
const { isUser } = require("../middlewares/isUser")

router.route('/getproducts').get(getProducts);
router.route("/razorpay/:productId").get(membership)
router.route("/membershipVerification").post(membershipVerification)
router.route("/verify-payment").post(isUser , verifyPayment)
router.route("/addmembers").post(isUser , addMembers)
router.route("/getmember").get(isUser , getMember)

module.exports = router;