const mongoose=require('mongoose');
const schema=mongoose.Schema;
const Users=require('./Users');
const reviewSchema=new schema({
    body:String,
    rating:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Users
    }
})
const Reviews=mongoose.model('Reviews',reviewSchema);
module.exports=Reviews