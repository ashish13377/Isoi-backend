const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username : {
       type : String,
       required : true,
       unique : true
    },
    password: {
        type: String,
        required: true
    },
    
} , {timestamps : true})

adminSchema.pre('save' , async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12);
    }
    next();
})


const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;