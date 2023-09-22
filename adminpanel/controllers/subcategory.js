const express = require('express');
const subcatModel = require('../models/subcategorymodel');
const app = express();
app.use(express.json());

const subcategory = async (req, res) => {
    res.render('subcat', { username: req.cookies.UserName,userimage:req.cookies.image, selected: 'subcat' });
}

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
    if(checkName) {
        var response = {};
        response.messages = 'category already exists';
        res.json(response);

    }else{
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
    
}

// data display in api

const SubCatData = async(req,res) => {
    const joindata = await subcatModel.find().populate("cat_id");
    res.json(joindata);
   
}

// data delete in api

const subcatdelete = async(req,res) => {
    const id = req.params.id;
    const data = await subcatModel.findByIdAndRemove({_id:id});
    res.json(data);
}

const subcatedit = async(req, res) => {
    let id = req.params.id;
    console.log(id);
    let data = await subcatModel.findOne({ _id: id });
    if(data)
    { 
        console.log(data);
        const name = req.body.name;
        const cat_id = req.body.cat_id;
        console.log(name);
        console.log(cat_id);
        let final = await subcatModel.updateOne({ _id: id },
            { $set: { name:name, cat_id:cat_id} });
            res.send("subcategory updated successfully");
        res.json(final);

    }else{
        res.send('No Data Found for Given Id [ '+id+' ]');
    }
   


}

module.exports = {
    subcategorydata,
    SubCatData,
    subcatdelete,
    subcatedit,
    subcategory
}