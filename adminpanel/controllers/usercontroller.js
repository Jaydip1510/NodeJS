let userModel = require('../models/usermodels');
const getDashboard = (req,res) => {
    res.render('index');
}

const getdata = (req,res) => {
    res.render('form');
}

const getpostdata = async (req,res) => {
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

module.exports = {
    getDashboard,
    getdata,
    getpostdata
}