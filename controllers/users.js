module.exports.renderRegister=(req, res) => {
    res.render('user/register')
}

module.exports.register=async (req, res, next) => {
    try{
        const { username, email, password } = req.body;
    const newUser = new Users({ email, username });
    const registeredUser= await Users.register(newUser, password);
    req.logIn(registeredUser,(err)=>{
        if(err){
            next(err)
        }
        else{
            req.flash('success', 'Welcome!!');
            res.redirect('/places');
        }
    })
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin=(req,res,next)=>{
    res.render('user/login');
}

module.exports.login=(req,res)=>{
    req.flash('success','Welcome Back!');
    const redirectUrl = res.locals.returnTo || '/places';
    console.log(redirectUrl);
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }else{
            req.flash('success','Logged out');
            res.redirect('/places');
        }
    })
}