let blogModel = require('../models/blogmodel');

const express = require('express');
const path = require("path");
const app = express();


const getdata = async(req,res)=>{
    res.render('blog',{data:''});
}

const bloggetdata = async(req,res)=>{
   let  alldata = await blogModel.find();
   const title = req.body.title;
   const shortdescription = req.body.shortdescription;
   const longdescription = req.body.longdescription;

   const result ={
    title:title,
    shortdescription:shortdescription,
    longdescription:longdescription
   }
   const savedata = new blogModel(result);
   await savedata.save();
   alldata = await blogModel.find();
   res.send('data inserted successfully');

}

const datadisplay = async(req,res) =>{
    const blogdata = await blogModel.find();
    res.render('blogdata',{
        data:blogdata
    });
}

const datadelete = async(req,res) =>{
    let id = req.params.id;
    await blogModel.findByIdAndRemove({ _id: id });
    res.send("data deleted successfully");
}

const editblog = async(req,res)=>{
    let id = req.params.id;
    console.log(id);
    let alldata = await blogModel.findOne({_id:id});
    console.log(alldata);
    res.render('blog',{alldata:alldata});
}


module.exports = {getdata,bloggetdata,datadisplay,datadelete,editblog}