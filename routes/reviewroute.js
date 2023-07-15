const express=require('express')

const router=express.Router();

const catchAsync=require('../utilities/catchasync');
const ExpressError=require('../utilities/ExpressError');
const {reviewSchema}=require('../schema')
const Reviews=require('../models/Reviews');
const Places=require('../models/places');

const {isLoggedIn,isReviewAuthor,validatePlaces,validateReviews}=require('../utilities/middleware');

const reviews=require('../controllers/reviews')


router.post('/:id',isLoggedIn,validateReviews,catchAsync(reviews.addReview));

router.delete('/delete/:id/:review_id',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview));
module.exports=router;