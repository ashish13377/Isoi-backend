const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
        // const conn = await mongoose.connect("mongodb+srv://ashishamrit:ISOI2021@isoi.rwtr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        const conn = await mongoose.connect("mongodb://localhost:27017/ISOI")
        console.log(`MongoDB Connected`)
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectMongo;