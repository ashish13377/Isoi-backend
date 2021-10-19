const mongoose = require("mongoose");

const eventsRegistrationSchema = new mongoose.Schema({
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
}, { timestamps: true })

const FreeEventsRegistrations = mongoose.model("FreeEventsRegistrations" , eventsRegistrationSchema);

module.exports = FreeEventsRegistrations;