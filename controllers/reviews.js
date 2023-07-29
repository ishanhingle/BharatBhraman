const Places=require('../models/places');
const Reviews=require('../models/Reviews');
const Users=require('../models/Users')

module.exports.addReview=async(req,res)=>{
    const{id}=req.params
    const place=await Places.findById(id);
    const review=new Reviews(req.body.review)
    review.rating=parseInt(review.rating);
    review.author=req.user._id;
    place.review.push(review);
    await review.save();
    await place.save();
    req.flash('success','Your review has been added successfully');
    res.redirect(`/places/${place._id}`);
}

module.exports.deleteReview=async(req,res,next)=>{
    const {id,review_id}=req.params;
    await Places.findByIdAndUpdate(id,{$pull:{review:review_id}});
    await Reviews.findByIdAndDelete(review_id);
    req.flash('success','Your review has been deleted successfully');
    res.redirect(`/places/${id}`);
}