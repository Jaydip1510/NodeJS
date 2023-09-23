let blogModel = require('../models/blogmodel');

const express = require('express');
const path = require("path");
const app = express();


const getdata = async(req,res)=>{
    res.render('blog');
}

module.exports = getdata