const express=require('express')
const ExpressError=require('../utilities/ExpressError');
const Places=require('../models/places');
const Reviews=require('../models/Reviews')
const {placeSchema,reviewSchema}=require('../schema')



module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
       req.flash('error','Please login first');
       res.redirect('/user/login')
    }
    else{
        next();
    }
}
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
module.exports.isAuthor=async (req,rs,next)=>{
    const{id}=req.params;
    const place=await Places.findById(id);
    if(!place.author.equals(req.user._id)){
        req.flash('error','Sorry you are not allowed to do so')
        res.redirect('/places');
    }
    else{
        next();
    }
}
module.exports.isReviewAuthor=async (req,rs,next)=>{
    const{review_id}=req.params;
    const review=await Reviews.findById(review_id);
    if(!review.author.equals(req.user._id)){
        req.flash('error','Sorry you are not allowed to do so')
        res.redirect('/places');
    }
    else{
        next();
    }
}
module.exports.validatePlaces=(req,res,next)=>{
    const{error}=placeSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}
module.exports.validateReviews=(req,res,next)=>{
    const review= req.body.review;
    review.rating=parseInt(review.rating);
    const{error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}