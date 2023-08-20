let userModel = require('../models/usermodels');
let registerModel = require('../models/registermodels');
const checkUser = async(req,res) => {
    if(req.cookies && req.cookies.UserName != "admin"){
        return res.redirect('/admin')
    }
}

const getDashboard = async (req, res) => {
    await checkUser(req, res)
    res.render('index',{username:req.cookies.UserName});
}

const getdata = async (req, res) => {
    await checkUser(req, res)
    res.render('form',{username:req.cookies.UserName});
}

const gettable = async (req, res) => {
    await checkUser(req, res)
    res.render('table',{username:req.cookies.UserName});
}
const getpostdata = async (req, res) => {
    const checkUser = await userModel.findOne({ email: req.body.email });
    console.log("Check user" + checkUser);
    if (checkUser) {
        return res.send('Email already exists');
    } else {
        const result = new userModel({
            id: 1,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        });
        const res1 = await result.save()
        console.log("data saved" + res1);
        res.redirect('login');
    }
}

const registerdata = async (req, res) => {
    

        const res2 = new registerModel({
            id: 1,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        });
        const abc = await res2.save()
        console.log("data saved" + abc);
        res.redirect('login');
    }

const checkUserData = async(req,res)=>{
    const dataUser = await registerModel.findOne({email: req.body.email,password: req.body.password});
    if(dataUser){
        res.cookie("UserName",dataUser.username);
        res.redirect('/admin');
    }else{
        req.flash('danger','Email or password wrong');
        res.render('login',{message:req.flash('danger')});
    }
}
module.exports = {
    getDashboard,
    getdata,
    getpostdata,
    gettable,
    checkUserData,
    registerdata
}