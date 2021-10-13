const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");


const memberShipSchema = new mongoose.Schema({
    account_id : {
        type : String,
    },
    event : {
        type : String,
    },
    paymentId : {
        type : String,
    },
    paymentAmount : {
        type : Number,
    },
    status : {
        type : String,
    },
    orderId : {
        type : String,
    },
    email : {
        type : String,
    },
    productName : {
        type : String,
    },
    createdAt : {
        type : String,
    },
    method : {
        type : String,
    },
    upiNetwork : {
        type : String,
    },
    upi_transaction_id : {
        type : String,
    },
    
    card_id : {
        type : String,
    },
    cardNetwork : {
        type : String,
    }
    
} , {timestamps : true})



const MemberShip = mongoose.model("MemberShip", memberShipSchema);

module.exports = MemberShip;