const mongoose = require("mongoose");

const paidEventsRegistration = new mongoose.Schema({
    fName: {
        type: String
    },
    mName: {
        type: String
    },
    lName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    wpNumber: {
        type: Number
    },
    department : {
        type : String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    eventId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FreeEvent"
    }
    ,
    eventName : {
        type: String
    },
    eventDate : {
        type: String
    }
}, { timestamps: true })

const PaidEventsRegistrations = mongoose.model("PaidEventsRegistrations" , paidEventsRegistration);

module.exports = PaidEventsRegistrations;