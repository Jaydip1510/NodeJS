let categoryModel = require('../models/categorymodel');
const express = require('express');
const app = express();


const getdata = async (req, res) => {
    res.render('category', { username: req.cookies.UserName, selected: 'category',message:'' });

}
const getcategorydata = async (req, res) => {
    var totdata = await categoryModel.countDocuments();

    const result = new categoryModel({
        id: (totdata + 1),
        categoryname: req.body.categoryname,
    });
    const res1 = await result.save()
    console.log("data saved" + res1);
    res.send("data inserted successfully");
    
}


module.exports = {
    getcategorydata,
    getdata,

} 