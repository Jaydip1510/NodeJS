let registerModel = require('../models/registermodel');
let categoryModel = require('../models/categorymodel');
let productModel= require('../models/productmodel');

const getDashboard = (req,res) =>{
    res.render('index');
}

const getform = (req,res) =>{
    res.render('category');
}

const getproduct = (req,res) =>{
    res.render('product');
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
    res.render('/login');
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

const categorydata = async(req,res) =>{ 
//   console.log("body is:-"+req.body);

var totdata = await categoryModel.countDocuments();

    const result = new categoryModel({
        id:(totdata+1),
        categoryname:req.body.categoryname,
    });
    const cat = await result.save();
    console.log("data saved"+ cat);
    res.send('data inserted successfully');
}

const productdetails = async(req,res)=>{
   
        
 }

module.exports = {
    getDashboard,
    register,
    checkUserData,
    getform,
    categorydata,
    getproduct,
    productdetails
}