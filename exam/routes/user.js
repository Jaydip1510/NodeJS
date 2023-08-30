const express = require('express');
const body = require('body-parser');
const router = express.Router();
const model = require('../models/productmodel');
const bodyParser = body.urlencoded({ extended: false });
const {getDashboard,register,checkUserData,getform,categorydata,getproduct,productdetails,categorydisplay,categorydelete,categoryedit,productdisplay,productdelete} = require("../controllers/usercontrollers");

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
module.exports = router;