const express = require('express');
const { set } = require('mongoose');
const path = require("path");
const app = express();

const roledata = async (req,res) =>{
     res.render('role',{ alldata: '' ,edit: ''});
}

module.exports = roledata