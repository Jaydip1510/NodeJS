const express = require('express');
const subcatModel = require('../models/subcategorymodel');
const categoryModel = require('../models/categorymodel');
const productModel = require('../models/productmodel');
const app = express();
app.use(express.json());

const productdata = async(req,res) =>{
    const catdata = await categoryModel.find();
    res.render('product',{username: req.cookies.UserName,userimage:req.cookies.image, selected: 'product',maincat:catdata });
}

const allproductdata = async(req, res) =>{
    const cat_id = req.body.cat_id;
    const sub_id = req.body.sub_id;
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
        sub_id:sub_id

    }
    const savedata = new productModel(result);
    await savedata.save();
    res.send('data inserted successfully');

}

module.exports = {productdata,allproductdata}