const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userEmail : {
        type : String
    },
    userPhone : {
        type : Number
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_signature: {
        type: String,
    },

}, { timestamps: true })



const PayStats = mongoose.model("PayStats", paymentSchema);

module.exports = PayStats;