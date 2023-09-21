const express = require('express');
const body = require('body-parser');
const router = express.Router();
const model = require('../models/productmodel');
const bodyParser = body.urlencoded({ extended: false });

const multer = require('multer');
const fs = require('fs');
let img = '';
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploadimg/')
    },
    filename: function (req, file, cb) {
        img = Date.now() + file.originalname;
        return cb(null, img);
    }
});
const upload1 = multer({ storage: store });
console.log(img);
const {getDashboard,register,checkUserData,getform,categorydata,getproduct,productdetails,categorydisplay,categorydelete,categoryedit,productdisplay,productdelete,productedit} = require("../controllers/usercontrollers");
const {getsliderdata,slider,slideldisplay} = require("../controllers/slidercontroller");

router.get('/dashboard',getDashboard);
router.get('/userform',getform);
router.get('/userform/:uniqe_id',getform);//Dummy URL Not Working
router.post('/register',register);
router.post('/login',checkUserData);
router.post('/categorydata',bodyParser,categorydata);
router.get('/product',getproduct);
router.post('/productdata',productdetails);
router.get('/categorylist',categorydisplay);
router.get('/catdelete/:uniqe_id',categorydelete);
router.get('/catedit',categoryedit);
router.get('/productlist',productdisplay);
router.get('/productdelete/:uniqe_id',productdelete);
router.get('/productedit',productedit);

// slider routes
router.get('/sliderdata',getsliderdata);
router.post('/slider',bodyParser,upload1.single('image'),slider);
router.get('/sliderinfo',slideldisplay);
module.exports = router;