const express = require('express');
const subcatModel = require('../models/subcategorymodel');
const categoryModel = require('../models/categorymodel');
const app = express();
app.use(express.json());

// const subcategory = async (req, res) => {
//     res.render('subcat', { username: req.cookies.UserName, userimage: req.cookies.image, selected: 'subcat', AllSubCat: '', catData: catData,subcatedit:'' });
// }


// data insert subcategory in subcategory table

const subcategorydata = async (req, res) => {
    let allsubcat = await subcatModel.find();
    const name = req.body.name;
    const id = req.body.cat_id;
    const checkName = await subcatModel.findOne({ name: name });

    const result = {
        cat_id: id,
        name: name
    }
    const savedata = new subcatModel(result);
    await savedata.save();

    allsubcat = await subcatModel.find();
    req.flash('msg_category', 'Subcategory inserted successfully');
    req.flash('msg_class', 'alert-success');
    res.redirect("/subcategory/alldata");
}


// update subcategory 

const updatesubcat = async (req, res) => {
    let getAllCat = await subcatModel.find();
    console.log(getAllCat);
    const name = req.body.name;
    const id = req.body.cat_id;
    const subid = req.params.id;
    const result = await subcatModel.findByIdAndUpdate({ _id: subid }, {
        $set: {
            name: name,
            cat_id: id
        }
    })
    req.flash('msg_category', 'SubCategory updated successfully');
    req.flash('msg_class', 'alert-success');
    res.redirect("/subcategory/alldata");
}

// data display in subcategory table

const SubCatData = async (req, res) => {
    let catData = await categoryModel.find();
    // console.log(catData);
    const joindata = await subcatModel.find().populate("cat_id");
    res.render('subcat', {
        username: req.cookies.UserName,
        AllSubCat: joindata,
        catData: catData,
        userimage: req.cookies.image,
        selected: 'subcat',
        subcatedit: '',
        message: req.flash('msg_category'),
        message_class: req.flash('msg_class'),
    });

}

// filtering category data

const getCatdata = async (req, res) => {
    let cat_id = req.query.selectedValue;
    let catdata;
    if (cat_id != '') {

        catdata = await subcatModel.find({ cat_id: cat_id }).populate("cat_id");
    } else {
        catdata = await subcatModel.find().populate("cat_id");
    }
    res.json(catdata);
}

// data delete in subcategory table

const subcatdelete = async (req, res) => {
    const id = req.params.id;
    const data = await subcatModel.findByIdAndRemove({ _id: id });
    req.flash('msg_category', 'Subcategory deleted successfully');
    req.flash('msg_class', 'alert-success');
    res.redirect("/subcategory/alldata");
}

const subcatedit = async (req, res) => {
    let id = req.params.id;
    let catData = await categoryModel.find();
    let subdata = await subcatModel.find().populate('cat_id');
    result = await subcatModel.findOne({ _id: id });
    res.render('subcat', {
        username: req.cookies.UserName,
        AllSubCat: subdata,
        catData: catData,
        userimage: req.cookies.image,
        selected: 'subcat',
        subcatedit: result,
        message: ''
    });
}

module.exports = {
    subcategorydata,
    SubCatData,
    subcatdelete,
    subcatedit,
    updatesubcat,
    getCatdata
}