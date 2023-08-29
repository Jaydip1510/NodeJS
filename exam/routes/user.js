const express = require('express');
const body = require('body-parser');
const router = express.Router();
const model = require('../models/productmodel');
const bodyParser = body.urlencoded({ extended: false });
const {getDashboard,register,checkUserData,getform,categorydata,getproduct,productdetails,categorydisplay} = require("../controllers/usercontrollers");

router.get('/dashboard',getDashboard);
router.get('/userform',getform);
router.post('/register',register);
router.post('/login',checkUserData);
router.post('/categorydata',bodyParser,categorydata);
router.get('/product',getproduct);
router.post('/productdetails',productdetails);
router.get('/categorylist',categorydisplay);

module.exports = router;