const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({ extended: false });
const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/adminpanel";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();
const passport = require('passport');
const router = express.Router();
const { getDashboard,  gettable, checkUserData, registerdata, getchart, getwidgets, getbutton, gettypography,getotherElement,checkLogindata,getprofile,sendOtp,vaildtoken} = require("../controllers/usercontroller");
const {getcategorydata,categorydisplay,categorydelete,categoryedit} = require("../controllers/categorycontroller");
// const getsubcategory = require("../controllers/subcategory");
router.get('/forgetpassword',(req,res)=>{
  res.render('forget',{ message:''})
})
//otp token routes
router.get('/resetcred',vaildtoken);
router.post('/resetcred',bodyParser,vaildtoken);
router.post('/forgetotp',bodyParser,sendOtp)

// main indexpage routes
router.get('/admin', getDashboard);

// category routes
router.get('/category',categorydisplay);
router.get('/catdelete/:uniqe_id',categorydelete);
router.get('/catedit',categoryedit);
router.post('/category/createsavedata', bodyParser, getcategorydata);
router.post('/category/editsavedata/:unique_id', bodyParser, getcategorydata);


//sub category routes
// router.post('/subcategory/savedata',body,getsubcategory);


// other pages routes
router.get('/chart', getchart);
router.get('/widget', getwidgets);
router.get('/button', getbutton);
router.get('/typography', gettypography);
router.get('/element',getotherElement);
router.get('/usertable', gettable);

//register routes
router.post('/register', bodyParser, registerdata);

//profile routes
router.get('/profile', getprofile);

//login routes
router.post("/login",bodyParser,checkLogindata);

module.exports = router;