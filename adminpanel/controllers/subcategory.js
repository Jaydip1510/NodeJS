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
const subcategorydata = async(req,res) =>{
    let allsubcat = await subcatModel.find();
    const name = req.body.name;
    const id = req.body.cat_id;
    const checkName = await subcatModel.findOne({name:name});

    const result = {
        cat_id: id,
        name: name
    }
    // console.log("isd is "+id);
    // console.log("name is "+name);
    const savedata = new subcatModel(result);
    await savedata.save();
    // res.send("data inserted successfully");
var response = {};

    allsubcat = await subcatModel.find();
    response.messages = 'data inserted successfully';
    response.data = allsubcat
    res.json(response);
}

module.exports = {
    subcategorydata 
}