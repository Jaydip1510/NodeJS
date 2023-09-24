const express = require('express');
const body = require('body-parser');

const router = express.Router();
const bodyParser = body.urlencoded({ extended: false });


const {getDashboard,register,checkUserData} = require("../controllers/usercontrollers");
const {getdata,bloggetdata,datadisplay} = require("../controllers/blogcontroller");

router.get('/dashboard',getDashboard);
router.post('/register',register);
router.post('/login',checkUserData);

// blog routes
router.get('/blogform',getdata);
router.post('/blogsavedata',bodyParser,bloggetdata);
router.get('/blogdisplay',datadisplay);

module.exports = router;