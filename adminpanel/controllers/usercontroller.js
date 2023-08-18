let userModel = require('../models/usermodels');
let registerModel = require('../models/registermodels');
const getDashboard = (req, res) => {
    res.render('index');
}

const getdata = (req, res) => {
    res.render('form');
}

const gettable = (req, res) => {
    res.render('table');
}



const getpostdata = async (req, res) => {
    const checkUser = await userModel.findone({ email: req.body.email });
    console.log("Check user" + checkUser);
    if (checkUser) {
        return res.render('Email already exists');
    } else {
        const result = new userModel({
            id: 1,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        });
        const res1 = await result.save()
        console.log("data saved" + res1);
        res.send("data saved");
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
        res.send("data saved");
    }

const login = (req, res) => {
    res.render('login');
}

const checkUserData = async(req,res)=>{
    const checkUser = await userModel.findone({email: req.body.email,password: req.body.password});
    if(checkUser){
        res.redirect('admin');
    }else{
        res.send("Email or password wrong");
    }
}
module.exports = {
    getDashboard,
    getdata,
    getpostdata,
    gettable,
    checkUserData,
    login,
    registerdata
}