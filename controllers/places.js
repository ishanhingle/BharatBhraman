const { array } = require('joi');
const Places=require('../models/places');
const {cloudinary}=require('../cloudinary/index')

module.exports.renderIndex=async (req,res,next)=>{
    const places= await Places.find({});
    res.render('places/index',{places})}

module.exports.renderNewform=(req,res)=>{
    res.render('places/new')
}

module.exports.addNewPlace=async(req,res,next)=>{
   const newplace=new Places(req.body.place);
   newplace.image=req.files.map(i=>({url:i.path,filename:i.filename}))
   const addressResponse= await fetch(`https://geocode.maps.co/search?q=${req.body.place.location}`);
   const address=await addressResponse.json();
   newplace.lat= address[0].lat;
   newplace.lon= address[0].lon;
   newplace.author=req.user._id;
   await newplace.save();
   req.flash('success','new place added successfully')
   console.log(newplace);
   res.redirect("/places")
}

module.exports.renderEditForm=async(req,res)=>{
    const{id}=req.params
    const place=await Places.findById(id)
    if (!place) {
        req.flash('error', 'Cannot find that place!');
         res.redirect('/places');
    }
    res.render('places/edit',{place});
}

module.exports.updatePlace=async(req,res,next)=>{
    const{id}=req.params
    const updated_place= await Places.findByIdAndUpdate(id,req.body.place);
    if(req.body.deleteImages){
        await updated_place.updateOne({$pull:{image:{filename:{$in:req.body.deleteImages}}}})
        for(filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
    }
    const images=req.files.map(i=>({url:i.path,filename:i.filename}));
    updated_place.image.push(...images);
    const addressResponse= await fetch(`https://geocode.maps.co/search?q=${req.body.place.location}`);
    const address=await addressResponse.json();
    updated_place.lat= address[0].lat;
    updated_place.lon= address[0].lon;
    await updated_place.save();
    req.flash('success','Informatation Updated!!');
    console.log(updated_place);
    res.redirect('/places')
}

module.exports.deletePlace=async(req,res,next)=>{
    const{id}=req.params
    await Places.findByIdAndDelete(id) ;
    req.flash('success','Place Deleted!');
    res.redirect('/places')
}

module.exports.showPlace=async (req,res,next)=>{
    const {id}=req.params
    const place=await Places.findById(id).populate({
        path:'review',
        populate:{
            path:'author'
        }
    }).populate('author');
    if (!place) {
        req.flash('error', 'Cannot find that place!');
        res.redirect('/places');
        return;
    }
    console.log(place);
    res.render('places/show',{place})
}