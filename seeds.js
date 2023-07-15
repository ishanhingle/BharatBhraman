const mongoose = require('mongoose');
const Places = require('./models/places');

mongoose.connect('mongodb://127.0.0.1:27017/bharat_bhraman');
Places.insertMany(
{
name:"Kasauli",
price:"1200rs",
description:"A small village in Himachal situated along the banks of the river Parvati, Kasol is a tourist attraction that is rapidly gaining fame as a very popular hub for trekkers, backpackers, and nature lovers. Commonly known as the Amsterdam of India, this quaint little village is resplendent in natural scenic beauty, and is one of the few places in the country that is yet to be ruined by urbanization and commercialization. Situated between the towns of Bhuntar and Manikaran, Kasol might seem like a plain, nondescript village from the outside, but it is one of the best places in the country to just sit back and chill in the lap of nature.With the waters of the Parvati river gurgling along and a stunning view of the snow-capped mountains in the background, taking a stroll along the river is one of the best ways to spend a day in Kasol. With smooth boulders and clean white sand separating the green grass from the frothing sea-green waters of the river",
location:"Punjab",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNk71voIariWPblzypJbWzOo5cL2-BDtpzZQ&usqp=CAU"
}).then(()=>{
    console.log("done");
}).catch((e)=>{
    console.log(e);
})