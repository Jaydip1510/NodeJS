let userModel = require('../models/usermodels');
let registerModel = require('../models/registermodels');
const checkUser = async(req,res) => {
    if(req.cookies)
    {
      if(req.cookies.UserName === undefined || req.cookies.UserName === 'undefined') {
            res.clearCookie('UserName');
            res.redirect('/');
            return false;  
        }
        // console.log(req.cookies.UserName);
        return true;
    }
    
}

const dataUser = async (req, res) => {
    if(req.cookies && req.cookies.UserName !='admin'){
        return res.redirect('/');
    }
};

const getDashboard = async (req, res) => {
    console.log("getDashboard called");
    var a = await checkUser(req, res);
    if(a === true){
        res.render('index',{username:req.cookies.UserName,selected:'admin'});
    }else{
    res.render('index',{username:req.cookies.UserName,selected:'admin'})
  }
};

const getdata = async (req, res) => {
    await checkUser(req, res)
    res.render('form',{username:req.cookies.UserName,selected:'form'});
}

const gettable = async (req, res) => {
    await checkUser(req, res)
    res.render('table',{username:req.cookies.UserName,selected:'table'});
}

const getchart = async (req, res) => {
    await checkUser(req, res)
    res.render('chart',{username:req.cookies.UserName,selected:'chart'});
}


const getwidgets = async (req, res) => {
    await checkUser(req, res)
    res.render('widget',{username:req.cookies.UserName,selected:'widget'});
}

const getbutton = async (req, res) => {
    await checkUser(req, res)
    res.render('button',{username:req.cookies.UserName,selected:'button'});
}

const gettypography = async (req, res) => {
    await checkUser(req, res)
    res.render('typography',{username:req.cookies.UserName,selected:'typography'});
}


const getotherElement = async (req, res) => {
    await checkUser(req, res)
    res.render('element',{username:req.cookies.UserName,selected:'element'});
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
    //  console.log(email+""+password);
    if(dataUser){
        res.cookie('UserName',dataUser.username);
        res.redirect('/admin');
    }else{
        req.flash('danger','Email or password wrong !!!');
        res.render('login',{message:req.flash('danger')});
    }
}
module.exports = {
    getDashboard,
    getdata,
    getpostdata,
    gettable,
    checkUserData,
    registerdata,
    getchart,
    getwidgets,
    getbutton,
    gettypography,
    getotherElement,
    dataUser
}