let registerModel = require('../models/registermodel');

const getDashboard = (req,res) =>{
    res.render('index');
}

const getform = (req,res) =>{
    res.render('form');
}

// inserted data from register model

const register = async(req, res) =>{
    console.log(req.body);
    const res2 = new registerModel({
        id: 1,

        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.cpassword
        
    });
    const abc = await res2.save()
    console.log("data saved" + abc);
    res.redirect('/login');
}

// check data from login page

const checkUserData = async(req,res)=>{
    const dataUser = await registerModel.findOne({username: req.body.username,password: req.body.password});
    if(dataUser){
        res.cookie('UserName',dataUser.username);
        res.redirect('/dashboard');
    }else{
        req.flash('danger','Email or password wrong !!!');
        res.render('login',{message:req.flash('danger')});
    }
}

module.exports = {
    getDashboard,
    register,
    checkUserData,
    getform
}