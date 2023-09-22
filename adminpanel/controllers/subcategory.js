const express = require('express');
const subcatModel = require('../models/subcategorymodel');
const categoryModel = require('../models/categorymodel');
const app = express();
app.use(express.json());

const subcategory = async (req, res) => {
    res.render('subcat', { username: req.cookies.UserName, userimage: req.cookies.image, selected: 'subcat', AllSubCat: '', catData: catData, });
}

const categorydata = async (req, res) => {
    const alldata = await categoryModel.find();
    console.log(alldata);
    res.render('category', {
        username: req.cookies.UserName,
        AllCat: alldata,
        AllSubCat: '',
        userimage: req.cookies.image,
        selected: 'subcat',
        catData: catData,
    });
}
// data insert subcategory in database

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
    res.redirect("/subcategory/alldata");

}
    


// data display in api

const SubCatData = async (req, res) => {
    let catData = await categoryModel.find();
    console.log(catData);
    const joindata = await subcatModel.find().populate("cat_id");
    res.render('subcat', {
        username: req.cookies.UserName,
        AllSubCat: joindata,
        catData: catData,
        userimage: req.cookies.image,
        selected: 'subcat'
    });

}

// data delete in api

const subcatdelete = async (req, res) => {
    const id = req.params.id;
    const data = await subcatModel.findByIdAndRemove({ _id: id });
    res.redirect("/subcategory/alldata");
}

const subcatedit = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let data = await subcatModel.findOne({ _id: id });
    if (data) {
        console.log(data);
        const name = req.body.name;
        const cat_id = req.body.cat_id;
        console.log(name);
        console.log(cat_id);
        let final = await subcatModel.updateOne({ _id: id },
            { $set: { name: name, cat_id: cat_id } });
        res.send("subcategory updated successfully");
        res.json(final);

    } else {
        res.send('No Data Found for Given Id [ ' + id + ' ]');
    }



}

module.exports = {
    subcategorydata,
    SubCatData,
    subcatdelete,
    subcatedit,
    subcategory
}