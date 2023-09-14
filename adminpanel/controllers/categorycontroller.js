let categoryModel = require('../models/categorymodel');
const express = require('express');
const app = express();

// insert category
const getcategorydata = async (req, res) => {
    const id = req.params.unique_id;
    const catname = req.body.categoryname;
    if (id === undefined) {
        const checkName = await categoryModel.findOne({ categoryname: catname })
        if (checkName) {
            req.flash('msg_category', 'category already exists');
            req.flash('msg_class', 'alert-danger');
            res.redirect('/category');
        } else {
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
    }
    else {
        //Edit Data
        let is_save = true;
        let chk_data = await categoryModel.findOne({ _id: id });
        if (chk_data) {
            var tmp_catname = chk_data.categoryname;
             if (tmp_catname.toUpperCase() != catname.toUpperCase()) {
            // if (tmp_catname != catname) {
                //const checkName = await categoryModel.findOne({ categoryname: catname })
                const checkName = await categoryModel.findOne({ categoryname: new RegExp(catname, 'i') });
                if (checkName) {
                    req.flash('msg_category', 'category already exists.');
                    req.flash('msg_class', 'alert-danger');
                    is_save = false;
                }
            }
            if (is_save) {
                req.flash('msg_category', 'category updated successfully');
                req.flash('msg_class', 'alert-success');
                let final = await categoryModel.updateOne({ _id: id },
                    { $set: { categoryname: req.body.categoryname } });
                console.log(final);
            }
        }
        res.redirect('/category');
    }
}

// display category 
const categorydisplay = async (req, res) => {
    const categoryData = await categoryModel.find({})

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
    let id = req.params.uniqe_id;
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