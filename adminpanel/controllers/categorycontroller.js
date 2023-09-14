let categoryModel = require('../models/categorymodel');
const express = require('express');
const app = express();

// insert category
const getcategorydata = async (req, res) => {
  
    var totdata = await categoryModel.countDocuments();
    const result = new categoryModel({
        id: (totdata + 1),
        categoryname: req.body.categoryname,
    });
    const res1 = await result.save()
    console.log("data saved" + res1);
    req.flash('msg_category', 'data inserted successfully');
    req.flash('msg_class', 'alert-success');
    res.redirect('/category');
    
}

// display category 
const categorydisplay = async (req, res) => {
    const categoryData = await categoryModel.find({})
    /*if(categoryData){
        res.send("Category Already exists");
    }*/
    if (!categoryData) {
        console.log(err);
    } else {
        res.render("category",{ username: req.cookies.UserName,
            details: categoryData,
            selected: 'category',
            message:req.flash('msg_category'),
            message_class:req.flash('msg_class'),
            data:''});
    }
}

// delete category

const categorydelete = async (req, res) => {
    let id = req.params.uniqe_id;;
    await categoryModel.deleteOne({ _id: id });
    res.redirect('/category');
}

// update category

const categoryedit = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let data = await categoryModel.findOne({ _id: id });
    console.log(data);
    const categoryData = await categoryModel.find({})
    res.render('category',{data: data,
        username: req.cookies.UserName,
        details: categoryData,
        selected: 'category',
        message: ''
        });
};

module.exports = {
    getcategorydata,
    categorydisplay,
    categorydelete,
    categoryedit

} 