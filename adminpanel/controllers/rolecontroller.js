const roleModel = require('../models/rolemodel')
const express = require('express');
const app = express();

const getdata = async(req,res) =>{
    res.render('role',{
        username: req.cookies.UserName,
        userimage:req.cookies.image,
        message: '',
        selected: '',
        AllRoleData:''
    })
}

const getroledata = async(req,res) =>{
  const rolename = req.body.rolename;
  const role = {
      rolename: rolename
  } 
  const savedata = new roleModel(role);
  await savedata.save();
  req.flash('msg_category', 'data inserted successfully');
  req.flash('msg_class', 'alert-success');
  res.redirect("/allroledata");
}

const allroledata = async (req, res) => {
     const role_data = await roleModel.find();
     res.render('role',{
        username: req.cookies.UserName,
        AllRoleData: role_data,
        userimage: req.cookies.image,
        selected: 'subcat',
        subcatedit: '',
        message: req.flash('msg_category'),
        message_class: req.flash('msg_class'),
     })
}

const roledatadelete = async (req,res) =>{
    const id = req.params.id;
    const data = await roleModel.findByIdAndRemove({ _id: id });
    req.flash('msg_category', 'Roledata deleted successfully');
    req.flash('msg_class', 'alert-success');
    res.redirect("/allroledata");
}

const roledataedit = async (req, res) =>{
    const id = req.params.id;
    let roledata = await roleModel.find()
    result = await subcatModel.findOne({ _id: id });
    res.render('role', {
        username: req.cookies.UserName,
        AllRoleData: roledata,
        catData: catData,
        userimage: req.cookies.image,
        selected: '',
        role_edit: result,
        message: ''
    });
}

module.exports = {
    getroledata,
    getdata,
    allroledata,
    roledatadelete,
    roledataedit

};