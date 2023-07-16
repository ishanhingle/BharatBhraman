const mongoose=require('mongoose');
const Reviews = require('./Reviews');
const Users=require('./Users');
const schema=mongoose.Schema

let placesSchema=new schema({
    name:String,
    price:Number,
    description:String,
    location:String,
    image:[{
        url:String,
        filename:String,
    }],
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reviews'
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Users
    },
    lat:Number,
    lon:Number
})
placesSchema.post('findOneAndDelete',async (place) => {
    if(place.review.length>1){
        await Reviews.deleteMany({_id:{$in:place.review}})
        console.log("deleted")
    }
})
let places=mongoose.model('places',placesSchema);

module.exports=places;