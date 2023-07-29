
 if(process.env.NODE_ENV!=="production"){
     require('dotenv').config();
 }
 
 const express=require('express');
 const mongoose=require('mongoose');
 const path=require('path');
 const methodOverride=require('method-override');
 const ejsMate=require('ejs-mate');
 const joi=require('joi')
 const session=require('express-session');
 const flash=require('connect-flash');
 const passport=require('passport');
 const localStrategy=require('passport-local');
 const passportLocalMongoose=require('passport-local-mongoose');
 const Mongostore=require('connect-mongo');
 
 const {placeSchema,reviewSchema}=require('./schema')
 
 const Places=require('./models/places');
 const Reviews=require('./models/Reviews');
 const Users=require('./models/Users');
 
 const catchAsync=require('./utilities/catchasync');
 const ExpressError=require('./utilities/ExpressError');
 
 
 const placeroute=require('./routes/placeroute');
 const userroute=require('./routes/userroute');
 const reviewroute=require('./routes/reviewroute');

 const DBurl=process.env.DBurl
 mongoose.connect(DBurl);
 const app=express();
 
 const store = Mongostore.create({
    mongoUrl: DBurl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});
 app.engine('ejs',ejsMate);
 app.set('view engine', 'ejs');
 app.set('views',path.join(__dirname,'/views'));
 
 const sessionConfig={
     secret:'ishanisbest',
     resave:false,
     store,
     saveUninitialized:true,
     Cookie:{
         expires:Date.now()+1000*60*60*24*7,
         maxAge:1000*60*60*24*7
     }
 }
 
 app.use(session(sessionConfig))
 app.use(flash())
 
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new localStrategy(Users.authenticate()));
 passport.serializeUser(Users.serializeUser());
 passport.deserializeUser(Users.deserializeUser());
 
 
 app.use((req,res,next)=>{
     res.locals.currentUser=req.user;
     res.locals.success=req.flash('success');
     res.locals.error=req.flash('error')
     next();
 })
 
 
 app.use(methodOverride('_method'))
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());
 
 
 const PORT=process.env.PORT || 3000;
 app.listen(PORT,()=>{
     console.log("server started");
 })
 
 app.use('/places',placeroute);
 app.use('/review',reviewroute)
 app.use('/user',userroute);
 app.use(express.static(path.join(__dirname,'/public')));
 
 app.get("/",async (req,res,next)=>{
     const places=await Places.find({});
     res.render('home',{places});
     next();
 })
 
 
 app.all('*',(req,res,next)=>{
     next(new ExpressError('page not found',404))
 })
 app.use((err, req, res, next)=>{
     if(!err.message){
         err.message='somthing went wrong :('
     }
     res.render('error.ejs',{err});
 })
 