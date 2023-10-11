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
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(req.url == '/profile/data')//Profile data POST Call
        {
            return cb(null, "./upload/");
        }else if(req.url == '/allproductdata' || req.route.path == '/updateproductdata/:id' || req.route.path == '/apiproductdata' || req.route.path == '/apiproductupdate/:id')//Product data POST Call
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

const { getDashboard,  gettable, checkUserData, registerdata, getchart, getwidgets, getbutton, gettypography,getotherElement,checkLogindata,getprofile,sendOtp,vaildtoken,getregister} = require("../controllers/usercontroller");

//category controller

const {getcategorydata,categorydisplay,categorydelete,categoryedit,api_category,api_categorydisplay,api_categorydelete,api_categoryedit,api_categoryupdate} = require("../controllers/categorycontroller");

//subcategory controller

const {subcategorydata, SubCatData,subcatdelete,subcatedit,updatesubcat,getCatdata,getsearching,api_subcategory,api_subcategorydisplay,api_subcategorydelete,api_subcategoryedit,api_subcategoryupdate} = require("../controllers/subcategory");

// profile controller

const {profiledata,profiledit} = require("../controllers/profilecontroller");

// jwt controller

const verifyToken = require('../models/jwtconfing');

//product controller

const {productdata,allproductdata,productDisplay,productDelete,productEdit,ajax_productdetail,productImageDelete,api_productdata,api_productdisplay,api_productdelete,api_productedit,api_productupdate} = require("../controllers/productcontroller");

// role controller

const {getroledata,getdata,allroledata,roledatadelete,roledataedit,roleupdate} = require("../controllers/rolecontroller");

let role = JSON.parse(localStorage.getItem('userRole'));

if(role === 'admin'){
    router.post('/roledata',getroledata)
    router.get('/rolealldata',getdata)
    router.get('/allroledata',allroledata);
    router.get('/roledatadelete/:id',roledatadelete)
    router.get('/roledataedit/:id',roledataedit)
    router.post('/roleupdate/:id',bodyParser,roleupdate)
    
}else{
    router.get('/pagenotfound',(req,res)=>{
        res.render('pagenotfound',{username: req.cookies.UserName, useremail: req.cookies.Useremail,userimage: req.cookies.image,selected: 'pagenotfound'})
    })
}

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
router.post("/updateproductdata/:id",upload.array('image'),bodyParser,allproductdata)// update product in product table
router.get('/productDisplay',productDisplay)// display product in product table
router.get('/productDelete/:id',productDelete)// delete product in product table
router.get('/productEdit/:id',productEdit);// edit button click to display data in textbox from product table
router.get('/productImageDelete/:id/:image_idx',productImageDelete);// update button click to display data in textbox from

// API Category Routes

router.post('/categorydata',bodyParser,api_category);
router.get('/apicategorydisplay',api_categorydisplay);
router.delete('/apicategorydelete/:id',api_categorydelete);
router.get('/apicategoryedit/:id',api_categoryedit);
router.patch('/apicategoryupdate/:id',api_categoryupdate);

// API Subcategory Routes
router.post('/apisubcategory',bodyParser,api_subcategory)
router.get('/apisubcategorydisplay',api_subcategorydisplay)
router.delete('/apisubcategorydelete/:id',api_subcategorydelete)
router.get('/apisubcategoryedit/:id',api_subcategoryedit)
router.patch('/apisubcategoryupdate/:id',api_subcategoryupdate)

// API Products Routes
router.post('/apiproductdata',upload.array('api_image'),bodyParser,api_productdata)
router.get('/apiproductdisplay',api_productdisplay)
router.delete('/apiproductdelete/:id',api_productdelete)
router.get('/apiproductedit/:id',api_productedit)
router.patch('/apiproductupdate/:id',upload.array('api_image'),api_productupdate)


// other pages routes

router.get('/chart', getchart);
router.get('/widget', getwidgets);
router.get('/button', getbutton);
router.get('/typography', gettypography);
router.get('/element',getotherElement);
router.get('/usertable', gettable);

//register routes

router.get('/getregister',getregister)
router.post('/register', bodyParser, registerdata);

//login routes
router.post("/login",bodyParser,checkLogindata);

// profile routes
router.get('/profile', getprofile);
router.post('/profile/data',upload.single('image'),bodyParser,profiledata);// profile insert 
router.get('/editprofile',profiledit);// profile update

module.exports = router;