const express = require('express');
const subcatModel = require('../models/subcategorymodel');
const categoryModel = require('../models/categorymodel');
const productModel = require('../models/productmodel');
const app = express();
app.use(express.json());

const productdata = async(req,res) =>{
    const catdata = await categoryModel.find();
    res.render('product',{username: req.cookies.UserName,userimage:req.cookies.image, selected: 'product',maincat:catdata,  productedit:'',pdata:''});
}

// insert product data

const allproductdata = async(req, res) =>{
    const cat_id = req.body.cat_id;
    const sub_id = req.body.sub_cat_id;
    const pname = req.body.pname;
    const price = req.body.price;
    const description = req.body.detail;
    var image = '';
    if(req.file)
    {
        if(req.file.filename !== undefined)
        {
            image = req.file.filename;
        }
    }
    const result = {
        pname: pname,
        price: price,
        description: description,
        image: image,
        cat_id:cat_id,
        sub_id:sub_id,

    }
    const savedata = new productModel(result);
    await savedata.save();
    res.redirect('/productDisplay');

}

// product display data in product table

const productDisplay = async(req,res) =>{
    let catData = await categoryModel.find();

    const productdata = await productModel.find().populate(["cat_id","sub_id"]);
    console.log(productdata);
    res.render('producttable', {
        username: req.cookies.UserName,
        productdata: productdata,
        catData: catData,
        userimage: req.cookies.image,
        selected: 'producttable',
        productedit: '',
        maincat:catData,
        pdata:''

    });

}

const productDelete = async (req,res) =>{
    const id = req.params.id;
    const data = await productModel.findByIdAndRemove({ _id: id });
    res.redirect('/productDisplay');
}

const productEdit = async(req,res) =>{
    let id = req.params.id;
    result = await productModel.findOne({ _id: id });
    let catData = await categoryModel.find();
    let pdata = await subcatModel.find({cat_id:cat_id}).populate("sub_id");
    console.log(result);
    res.render('product', {
        username: req.cookies.UserName,
        productdata:'',
        catData: catData,
        userimage: req.cookies.image,
        selected: 'producttable',
        productedit: result,
        maincat:catData,
        pdata:pdata
        
    });
}

module.exports = {productdata,allproductdata,productDisplay,productDelete,productEdit}