const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_order_id: {
        type: Number,
    },
    razorpay_signature: {
        type: String,
    },

}, { timestamps: true })



const PayStats = mongoose.model("PayStats", paymentSchema);

module.exports = PayStats;