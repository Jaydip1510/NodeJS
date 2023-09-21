let sliderModel = require('../models/slidermodel');
const express = require('express');
const path = require("path");
const app = express();

const getsliderdata = async(req,res) =>{
    res.render('slider');
}

const slider = async(req,res) =>{
     let data = await sliderModel.find();
     console.log(data);
     const image = req.file.filename;
       const result = {
            image: image
       }
     const savedata = new sliderModel(result);
     await savedata.save();
     res.send("image inserted successfully");
}

module.exports = {slider,getsliderdata } 