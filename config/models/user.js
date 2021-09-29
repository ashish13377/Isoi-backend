const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone : {
        type : Number,
        required : true,
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    username : {
       type : String,
       required : true,
       unique : true
    },
    picture : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    cfpassword: {
        type: String,
        required: true
    },
    
} , {timestamps : true})

userSchema.pre('save' , async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12);
        this.cfpassword = await bcrypt.hash(this.cfpassword , 12);
    }
    next();
})


const User = mongoose.model("User", userSchema);

module.exports = User;