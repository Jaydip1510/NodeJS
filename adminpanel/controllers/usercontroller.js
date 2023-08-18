let userModel = require('../models/usermodels');
const getDashboard = (req,res) => {
    res.render('index');
}

const getdata = (req,res) => {
    res.render('form');
}

const gettable = (req,res) => {
    res.render('table');
}



const getpostdata = async (req,res) => {
    const checkUser = await userModel.findone({email: req.body.email});
    console.log("Check user"+checkUser);
    if(checkUser){
       return res.render('Email already exists');
    }else{
        const result = new userModel({
            id:1,
            email:req.body.email,
            password:req.body.password,
            username:req.body.username,
        });
        const res1 = await result.save()
        console.log("data saved"+res1);
        res.send("data saved");
      }
    }


    

module.exports = {
    getDashboard,
    getdata,
    getpostdata,
    gettable,
   
}