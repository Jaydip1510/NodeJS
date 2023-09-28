const roleModel = require('../models/rolemodel')
const express = require('express');
const { set } = require('mongoose');
const path = require("path");
const app = express();

const roledata = async (req,res) =>{
     res.render('role',{ alldata: '' ,edit: ''});
}

const roleinfo = async (req,res) =>{
    const rolename = req.body.rolename;
    const permission = req.body.permission;

    const result = {
         rolename:rolename,
         permission:permission
    }
    const savedata = new roleModel(result);
    await savedata.save();
    res.redirect('/allroledisplay');
}

const roledisplay = async (req, res) => {
    const role = await roleModel.find();
    res.render('roledata',{
        data:role,
        alldata:''
    })
}

const roledelete = async (req, res) => {
    let id = req.params.id;
    await roleModel.findByIdAndRemove({ _id: id });
    res.redirect('/allroledisplay');
}

const editrole = async (req, res) => {
    let id = req.params.id;
    let alldata = await roleModel.findOne({ _id: id });
    console.log(alldata);
    if (!alldata) {
        res.send('No Data Found');
    } else {
        console.log(alldata);
        res.render('role', { alldata: alldata});
    }
}


module.exports = {roledata,roleinfo,roledisplay,roledelete,editrole}