let categoryModel = require('../models/categorymodel');
const express = require('express');
const app = express();

// insert category
const getcategorydata = async (req, res) => {

    var totdata = await categoryModel.countDocuments();
    if (req.body.id != "") {
        //Edit Data
        let chk_data = await categoryModel.findOne({ _id: req.body.id });
        if (chk_data) {
            let final = await categoryModel.updateOne({ _id: req.body.id, }, { $set: { categoryname: req.body.categoryname, } })
            console.log(final);
        }
        req.flash('msg_category', 'category updated successfully');
        req.flash('msg_class', 'alert-success');
        res.redirect('/category');
    } else {
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
        res.render("category", {
            username: req.cookies.UserName,
            details: categoryData,
            selected: 'category',
            message: req.flash('msg_category'),
            message_class: req.flash('msg_class'),
            data: ''
        });
    }
}

// delete category

const categorydelete = async (req, res) => {
    let id = req.params.uniqe_id;;
    await categoryModel.deleteOne({ _id: id });
    req.flash('msg_category', 'data deleted successfully');
    req.flash('msg_class', 'alert-success');
    res.redirect('/category');
}

// update category

const categoryedit = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let data = await categoryModel.findOne({ _id: id });
    console.log(data);
    const categoryData = await categoryModel.find({})
    res.render('category', {
        data: data,
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