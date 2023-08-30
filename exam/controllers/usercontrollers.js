let registerModel = require('../models/registermodel');
let categoryModel = require('../models/categorymodel');
let productModel = require('../models/productmodel');
const express = require('express');
const path = require("path");
const app = express();

const multer = require('multer');
const fs = require('fs');
let imgname = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        imgname = Date.now() + file.originalname;
        return cb(null, imgname);
    }
});
const upload = multer({ storage: storage });
console.log(imgname);

// create folder
// const upload = multer({dest:'./upload'})

const getDashboard = (req, res) => {
    res.render('index');
}

const getform = (req, res) => {

    res.render('category', { data: '' });
}

const getproduct = async(req, res) => {
    const allDetails = await categoryModel.find({});
    res.render('product',{ data: '',category:allDetails});
}
// display data in category tables
const categorydisplay = async (req, res) => {
    const allDetails = await categoryModel.find({})
    if (!allDetails) {
        console.log(err);
    } else {
        res.render("categorydata", { details: allDetails })
    }
}

// delete category data

const categorydelete = async (req, res) => {
    let id = req.params.uniqe_id;
    await categoryModel.deleteOne({ _id: id });
    res.redirect('/categorylist');
}

//edit category

const categoryedit = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let data = await categoryModel.findOne({ _id: id });
    console.log(data);
    res.render('category', { data: data });

};

// product display in prduct table

const productdisplay = async(req,res) =>{
    const allDetails = await productModel.find({})
    if (!allDetails) {
        console.log(err);
    } else {
        res.render("productdata", { details: allDetails })
    }
}

//product delete from product table

const productdelete = async (req, res) => {
    let id = req.params.uniqe_id;
    await productModel.deleteOne({ _id: id });
    res.redirect('/productlist');
}

//product update from product table

const productedit = async (req,res) => {
    let id = req.query.id;
    console.log(id);
    const allDetails = await categoryModel.find({});
    let data = await productModel.findOne({ _id: id });
    console.log(data);
    res.render('product',{ data: data,category:allDetails});
};

// inserted data from register model

const register = async (req, res) => {
    console.log(req.body);
    const res2 = new registerModel({
        id: 1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.cpassword

    });
    const abc = await res2.save()
    console.log("data saved" + abc);
    res.render('/login');

}
// check data from login page

const checkUserData = async (req, res) => {
    const dataUser = await registerModel.findOne({ username: req.body.username, password: req.body.password });
    if (dataUser) {
        res.cookie('UserName', dataUser.username);
        res.redirect('/dashboard');
    } else {
        req.flash('danger', 'Email or password wrong !!!');
        res.render('login', { message: req.flash('danger') });
    }
}

const categorydata = async (req, res) => {

    var totdata = await categoryModel.countDocuments();
    if (req.body.id != "") {
        //Edit Data
        let chk_data = await categoryModel.findOne({ _id: req.body.id });
        if (chk_data) {
            let final = await categoryModel.updateOne({_id: req.body.id,}, {$set: { categoryname: req.body.categoryname,} })
            console.log(final);
        }
        res.redirect('/categorylist');

    } else {
        const result = new categoryModel({
            id: (totdata + 1),
            categoryname: req.body.categoryname,
        });

        const cat = await result.save();
        console.log("data saved" + cat);
        res.redirect('/categorylist');
    }
    
}

const productdetails = async (req, res) => {
    const upload_file = await upload.single('image');
    upload_file(req, res, async function (error) {
        if (req.body.id != "") {
            //edit product data
            let chk_data = await productModel.findOne({_id:req.body.id});
            if(chk_data){
                let final = await productModel.updateOne({_id:req.body.id},
                    {$set:
                        { 
                            productname:req.body.productname,
                            productprice:req.body.productprice,
                            image:imgname
                        }
                    })
                    console.log(final);
                    res.redirect('productlist');
            }
        }
        else {
            var totdata = await productModel.countDocuments();

            const result = new productModel({
                id: (totdata + 1),
                selectcategory:req.body.category,
                productname: req.body.productname,
                productprice: req.body.productprice,
                image: imgname
            });
            const cat = await result.save();
            console.log("data saved" + cat);
            res.redirect('productlist');
        }

    });

};
module.exports = {
    getDashboard,
    register,
    checkUserData,
    getform,
    categorydata,
    getproduct,
    productdetails,
    categorydisplay,
    categorydelete,
    categoryedit,
    productdisplay,
    productdelete,
    productedit
}