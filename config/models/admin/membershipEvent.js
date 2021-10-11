const mongoose = require("mongoose");


const membershipSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    eventPoster: {
        type: String,
        // required: true
    },
    eventDate: {
        type: String,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: Number,
        required: true,
    },
    contactDesignation: {
        type: String,
        required: true,
    },
    participants: {
        participant: []
    }
}, { timestamps: true })


const MemberShipEvent = mongoose.model("MemberShipEvent", membershipSchema);

module.exports = MemberShipEvent;