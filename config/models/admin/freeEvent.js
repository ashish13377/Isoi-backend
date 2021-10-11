const mongoose = require("mongoose");


const freeEventSchema = new mongoose.Schema({
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
        type : String,
        required : true,
    },
    eventTime: {
        type : String,
        required : true,
    },
    venue: {
        type : String,
        required : true,
    },
    contactName: {
        type : String,
        required : true,
    },
    contactEmail: {
        type : String,
        required : true,
    },
    contactPhone: {
        type : Number,
        required : true,
    },
    contactDesignation: {
        type : String,
        required : true,
    },
    participants : {
        participant : []
    }
}, { timestamps: true })


const FreeEvent = mongoose.model("FreeEvent", freeEventSchema);

module.exports = FreeEvent;