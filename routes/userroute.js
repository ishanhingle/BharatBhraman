const express = require('express');
const passport=require('passport');
const Users = require('../models/Users')
const catchAsync = require('../utilities/catchasync');
const catchasync = require('../utilities/catchasync');
const {storeReturnTo} = require('../utilities/middleware');



const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const users=require('../controllers/users');
router.get('/register', users.renderRegister);
router.post('/register',catchAsync(users.register))
router.route('/login')
.get(users.renderLogin)
.post(storeReturnTo,passport.authenticate('local',{failureFlash:true,failureRedirect:'login'}),users.login)

router.get('/logout',users.logout)
module.exports = router;