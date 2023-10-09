const roleModel = require('../models/rolemodel')
const express = require('express');
const app = express();

const getdata = async(req,res) =>{
    res.render('role',{
        username: req.cookies.UserName,
        userimage:req.cookies.image,
        message: '',
        selected: ''
    })
}


const getroledata = async(req,res) =>{
  const rolename = req.body.rolename;
  const role = {
      rolename: rolename
  } 
  const savedata = new roleModel(role);
  await savedata.save();

}

module.exports = {
    getroledata,
    getdata

};