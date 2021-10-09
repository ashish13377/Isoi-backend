const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv').config()

const userRoutes = require("./routes/userRoutes.js")
const adminRoutes = require("./routes/admin/adminRoutes.js")
const connectMongo = require("./config/db/db.js")

const PORT = process.env.PORT || 8000;
const URL = "http://localhost:8000/"


connectMongo();
app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.get("/" , (req,res) => {
    res.json({message : "Hello, from ISOI-HITK"});
})

app.use("/api/users" , userRoutes);
app.use("/api/admin" , adminRoutes);

app.listen(PORT , () => {
   console.log(`Server Listening on ${URL}`);
})