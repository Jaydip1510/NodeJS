const express = require('express');
const subcatModel = require('../models/subcategorymodel');
const categoryModel = require('../models/categorymodel');
const productModel = require('../models/productmodel');
const app = express();
app.use(express.json());

const productdata = async(req,res) =>{
    res.render('product',{username: req.cookies.UserName,userimage:req.cookies.image, selected: 'product' });
}

module.exports = productdata