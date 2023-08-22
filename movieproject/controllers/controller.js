
const model = require('../models/usermodel');
const fs = require('fs');
let user = '';
let iname = '';
const data = async (req, res) => {
    let user = await model.find(); 
    console.log(user);
        res.render('index', {
        data: user,
        user: user
    });  
}
const deldata = async (req, res) => {
     let user = await model.findOne({_id: req.params.id});
     let img = "uploads/" + user.pimage;
    fs.unlink(img, () => {
        console.log("delete");
    });

    await model.findByIdAndDelete({_id: req.params.id});
    res.redirect('/moviecrud');
}

const aditdata = async (req, res) => {
    let user = await model.findOne({_id: req.params.id});
    res.render('index', {
        data: user,
        user: user
    });

};
module.exports = {
    data, deldata, aditdata
}