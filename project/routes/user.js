const express = require('express');
const body = require('body-parser');

const router = express.Router();
const bodyParser = body.urlencoded({ extended: false });


const {getDashboard,register,checkUserData} = require("../controllers/usercontrollers");
const {getdata,bloggetdata,datadisplay,datadelete,editblog,longblog} = require("../controllers/blogcontroller");

router.get('/dashboard',getDashboard);
router.post('/register',register);
router.post('/login',checkUserData);

// blog routes
router.get('/blogform',getdata);
router.post('/blogsavedata',bodyParser,bloggetdata);     // Create a new blog
router.post('/blogsavedata/:id',bodyParser,bloggetdata); //Edit a blog
router.get('/blogdisplay',datadisplay);
router.get('/deleteblog/:id',datadelete);
router.get('/editblog/:id',editblog);

router.get('/longdata',longblog);

module.exports = router;