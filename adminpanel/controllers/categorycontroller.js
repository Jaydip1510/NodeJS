let categoryModel = require('../models/categorymodel');
const express = require('express');
const app = express();


// const getdata = async (req, res) => {
//     res.render('category', { username: req.cookies.UserName, selected: 'category',message:'' });

// }

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
    res.render('category', { message: req.flash('msg_category'), message_class: 'alert-success', username: req.cookies.UserName,selected: 'category',details: allDetails});
    
}

// display category 
const categorydisplay = async (req, res) => {
    const categoryData = await categoryModel.find({})
    /**
     * Loop through all available categories
     */
    let allDetails = [];
    for (const category of categoryData) {
        let copiedcategory = JSON.parse(JSON.stringify(category));
        allDetails.push(copiedcategory);
    }

    if (!allDetails) {
        console.log(err);
    } else {
        res.render("category",{ username: req.cookies.UserName,details: allDetails,selected: 'category',message:'' })
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
    res.redirect('category');

};

module.exports = {
    getcategorydata,
    categorydisplay,
    categorydelete,
    categoryedit

} 