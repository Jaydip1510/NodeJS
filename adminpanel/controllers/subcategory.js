const express = require('express');
const subcatModel = require('../models/subcategorymodel');
const app = express();
app.use(express.json());

const categorydata = async(req,res)=>{
    const alldata = await categoryModel.find();
    console.log(alldata);
    res.render('category',{
        username: req.cookies.UserName,
        AllCat: alldata,
    });
}
// data insert subcategory in database

const subcategorydata = async(req,res) =>{
    let allsubcat = await subcatModel.find();
    const name = req.body.name;
    const id = req.body.cat_id;
    const checkName = await subcatModel.findOne({name:name});

    const result = {
        cat_id: id,
        name: name
    }
    const savedata = new subcatModel(result);
    await savedata.save();

var response = {};

    allsubcat = await subcatModel.find();
    response.messages = 'data inserted successfully';
    response.data = allsubcat
    res.json(response);
}

// data display in api

const SubCatData = async(req,res) => {
    const joindata = await subcatModel.find().populate("cat_id");
    res.json(joindata);
    
}

// data delete in api

const subcatdelete = async(req,res) => {
    const data = await subcatModel.deleteOne().populate("cat_id");
    res.json(data);
}


module.exports = {
    subcategorydata,
    SubCatData,
    subcatdelete 
}