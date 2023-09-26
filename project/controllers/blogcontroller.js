let blogModel = require('../models/blogmodel');

const express = require('express');
const { set } = require('mongoose');
const path = require("path");
const app = express();


const getdata = async (req, res) => {
    res.render('blog', { alldata: '' ,edit: ''});
}

const bloggetdata = async (req, res) => {
    let id = req.params.id != '' &&  req.params.id != undefined ? req.params.id : -1;
    const title = req.body.title;
    const shortdescription = req.body.shortdescription;
    const longdescription = req.body.longdescription;

    
    if (id == -1) {
        const result = {
            title: title,
            shortdescription: shortdescription,
            longdescription: longdescription
        }
        const savedata = new blogModel(result);
        await savedata.save();
        
     } else {
        let chkData = await blogModel.findOne({ _id: id });
        if (chkData) {
            await blogModel.updateOne({ _id: id },{ $set: {title: title,
                shortdescription: shortdescription,
                longdescription: longdescription,updatedOn:Date.now}});
        }
    }
    res.redirect('/blogdisplay');

}

const datadisplay = async (req, res) => {
    const blogdata = await blogModel.find();
    res.render('blogdata', {
        data: blogdata,
        alldata: ''
    });
}

const datadelete = async (req, res) => {
    let id = req.params.id;
    await blogModel.findByIdAndRemove({ _id: id });
    res.redirect('/blogdisplay');
}

const editblog = async (req, res) => {
    let id = req.params.id;
    let alldata = await blogModel.findOne({ _id: id });
    if (!alldata) {
        res.send('No Data Found');
    } else {
        console.log(alldata);
        res.render('blog', { alldata: alldata,edit: 'edit' });
    }
}

const details = async (req, res) => {
    let id = req.params.id;
    let blogdata = await blogModel.findOne({ _id: id });
    console.log(blogdata);
    res.render('detail', {
        data: blogdata,
        alldata: ''
    });
}


module.exports = { getdata, bloggetdata, datadisplay, datadelete, editblog,details }