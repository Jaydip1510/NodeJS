const express = require('express');
const subcatModel = require('../models/subcategorymodel');

const subcat = async (req, res) => {
    res.render('subcat', { username: req.cookies.UserName, selected: 'subcat',category:'' });
}

const subcategorydata = async(req,res) =>{
    const subcatdata = await subcatModel.find({});
    var totdata = await subcatModel.countDocuments();

    const result = new subcatModel({
        id:(totdata+1),
        selectcategory:req.body.categoryname,
        subcatname:req.body.subcatname
    });
     const subcat = await result.save();
     console.log("data saved" + subcat);
     res.send("data inserted successfully");
}

module.exports = {
    subcategorydata,
    subcat
}