let profileModel = require('../models/profile');
const express = require('express');
const app = express();
const multer = require("multer");
const fs = require("fs");
let imgfilename = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./upload/");
    },
    filename: function (req, file, cb) {
        imgfilename = Date.now() + file.originalname;
        return cb(null, imgfilename);
    }
});
const upload = multer({ storage: storage });

const profiledata =  async (req, res) =>{
    upload.single('img');
    let allsubcat = await profileModel.find();
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const location = req.body.location;
    // const image = imgfilename

    const result = {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        mobile: mobile,
        email: email,
        Location: location,
        // image: image
    }
    const savedata = new profileModel(result);
    await savedata.save();
    res.send("data inserted successfully");

}

module.exports = profiledata