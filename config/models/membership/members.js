const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String
    },
    birthData: {
        type: String
    },
    gender: {
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
    year: {
        type: String
    },
    duration : {
        type : Number,
        required : true
    },
    autonomyRoll: {
        type: Number
    },
    collegeRoll: {
        type: Number
    },
    attendAnyEvent: {
        type: String
    },
    feedback: {
        type: String
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    postalCode: {
        type: Number
    },
    isMember : {
        type : Boolean,
        required : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Members = mongoose.model("Members" , memberSchema);

module.exports = Members;