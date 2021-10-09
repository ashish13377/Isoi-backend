const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
         const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL)
        console.log(`MongoDB Connected`)
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectMongo;