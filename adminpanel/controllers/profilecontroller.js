let profileModel = require('../models/profile');
const express = require('express');
const app = express();

const profiledata =  async (req, res) =>{
  
    let is_exists = await profileModel.findOne({email: req.cookies.Useremail});
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const email =  req.cookies.Useremail;
    const location = req.body.location;
    const image = req.file.filename;
    if(is_exists){
        const update = await profileModel.updateOne({ email: req.cookies.Useremail }, 
            { $set:{
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                mobile: mobile,
                email: email,
                location: location,
                image: image
            } });
            console.log(update);
        res.send("data updated successfully");
    }
    else{
        const result = {
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            mobile: mobile,
            email: email,
            location: location,
            image: image
        }
        const savedata = new profileModel(result);
        await savedata.save();
        res.cookie('Userimage', allsubcat.image);
        res.send("data inserted successfully");

    }

    
   
}

const profiledit = async(req, res) =>{

    let data = await profileModel.findOne({email: req.cookies.Useremail});
    res.render('profile',{ profile_data: data, username: req.cookies.UserName,useremail: req.cookies.Useremail,userimage:req.cookies.image, selected: 'profile' ,is_edit:true})

}

module.exports = {profiledata,profiledit}