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

const multer = require("multer");
const fs = require("fs");
let imgfilename = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(req.url == '/profile/data')//Profile data POST Call
        {
            return cb(null, "./upload/");
        }else if(req.url == '/allproductdata' || req.route.path == '/updateproductdata/:id')//Product data POST Call
        {
            return cb(null, "./product/");
        }
        
    },
    filename: function (req, file, cb) {
        imgfilename = Date.now() + file.originalname;
        return cb(null, imgfilename);
    }
});
const upload = multer({ storage: storage });

// usercontroller

const { getDashboard,  gettable, checkUserData, registerdata, getchart, getwidgets, getbutton, gettypography,getotherElement,checkLogindata,getprofile,sendOtp,vaildtoken} = require("../controllers/usercontroller");

//category controller

const {getcategorydata,categorydisplay,categorydelete,categoryedit} = require("../controllers/categorycontroller");

//subcategory controller

const {subcategorydata, SubCatData,subcatdelete,subcatedit,updatesubcat,getCatdata,getsearching} = require("../controllers/subcategory");

// profile controller

const {profiledata,profiledit} = require("../controllers/profilecontroller");

// jwt controller

const verifyToken = require('../models/jwtconfing');

//product controller

const {productdata,allproductdata,productDisplay,productDelete,productEdit,ajax_productdetail,productUpdate} = require("../controllers/productcontroller");

// API controller

const {api_category,api_categorydisplay} =require("../controllers/apicontroller");

// forgetpassword routes
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

router.get('/category',verifyToken,categorydisplay);// category display in category table
router.get('/catdelete/:uniqe_id',categorydelete);// category delete in category table
router.get('/catedit',categoryedit);//category edit in category table
router.post('/category/createsavedata', bodyParser, getcategorydata);// category insert in category table
router.post('/category/editsavedata/:unique_id',verifyToken, bodyParser, getcategorydata);// category update in category table


//sub category routes

router.post('/subcategory/savedata',bodyParser,subcategorydata);// insert sub category in sub category table
router.get('/subcategory/alldata', verifyToken,SubCatData);// display sub category in sub category table
router.get('/subcat/deletedata/:id',subcatdelete);// delete sub category in sub category table
router.get('/subcategortedit/:id',subcatedit)// edit click to edit button  sub category in sub category table
router.post('/updatesubcategory/:id',bodyParser,updatesubcat)// update sub category in sub category table

// filtering routes

router.get('/getalldata',getCatdata);// filter sub category in sub category table
router.get('/filteralldata',getsearching);// searching sub category in sub category table
router.get('/ajax_productdetail',ajax_productdetail)

// product routes

router.get('/product',productdata)// create product form
router.post("/allproductdata",upload.array('image'),bodyParser,allproductdata)// insert product in product table
router.post("/updateproductdata/:id",upload.single('image'),bodyParser,allproductdata)// update product in product table
router.get('/productDisplay',productDisplay)// display product in product table
router.get('/productDelete/:id',productDelete)// delete product in product table
router.get('/productEdit/:id',productEdit);// edit button click to display data in textbox from product table
router.get('/productupdate/:id',productUpdate);// update button click to display data in textbox from

// API Routes

router.post('/categorydata',bodyParser,api_category);
router.get('/apicategorydisplay',api_categorydisplay)

// other pages routes

router.get('/chart', getchart);
router.get('/widget', getwidgets);
router.get('/button', getbutton);
router.get('/typography', gettypography);
router.get('/element',getotherElement);
router.get('/usertable', gettable);

//register routes
router.post('/register', bodyParser, registerdata);

//login routes
router.post("/login",bodyParser,checkLogindata);

// profile routes
router.get('/profile', getprofile);
router.post('/profile/data',upload.single('image'),bodyParser,profiledata);// profile insert 
router.get('/editprofile',profiledit);// profile update

module.exports = router;