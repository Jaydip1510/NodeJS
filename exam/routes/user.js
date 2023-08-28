const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({ extended: false });
const router = express.Router();
const {getDashboard,register,checkUserData,getform,categorydata,getproduct} = require("../controllers/usercontrollers");

router.get('/dashboard',getDashboard);
router.get('/userform',getform);
router.post('/register',register);
router.post('/login',checkUserData);
router.post('/categorydata',bodyParser,categorydata);
router.get('/product',getproduct);

module.exports = router;