let profileModel = require('../models/profile');
const express = require('express');
const app = express();

const profiledata =  async (req, res) =>{
    let allsubcat = await profileModel.find();
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const email =  req.cookies.Useremail;
    const location = req.body.location;
    const image = req.file.filename

    const result = {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        mobile: mobile,
        email: email,
        Location: location,
        image: image
    }
    const savedata = new profileModel(result);
    await savedata.save();
    res.cookie('Userimage', allsubcat.image);
    res.send("data inserted successfully");

}

module.exports = profiledata