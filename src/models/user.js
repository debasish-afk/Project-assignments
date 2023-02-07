const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        requires:true
    },
    emailId:{
        type:String,
        requires:true
    },
    password:{
        type:String,
        requires:true
    },
    PhoneNo:{
        type:String,
        requires:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

module.exports=mongoose.model("user",userSchema)