const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose')
const schema=mongoose.Schema;

const userSchema=new mongoose.Schema({
 email:{
    type:String,
    required:true,
    unique:true
 }
})
userSchema.plugin(passportLocalMongoose)
const User1=new mongoose.model('User1',userSchema);
module.exports=User1