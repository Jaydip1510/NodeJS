const express = require('express');
const body = require('body-parser');

const router = express.Router();
const bodyParser = body.urlencoded({ extended: false });


const {getDashboard,register,checkUserData} = require("../controllers/usercontrollers");
const {getdata,bloggetdata,datadisplay,datadelete,editblog,details} = require("../controllers/blogcontroller");

const {roledata,roleinfo,roledisplay,roledelete,editrole,role2user,role2userdisplay,role2user_create_update} = require("../controllers/rolecontroller");

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
router.get('/detailblog/:id',details);
//Roles routes -- Start
router.get('/allroledisplay',roledisplay); // Display
router.get('/alldelete/:id',roledelete);// Delete
router.get('/roledetail',roledata);//Create Form display 
router.post('/allroledata',bodyParser,roleinfo);// POST - Create Form
router.get('/editrole/:id',editrole);//Edit Form display
router.post('/allroledata/:id',bodyParser,roleinfo); // POST - Update Form
router.get('/role2userdisplay',role2userdisplay);//Display Role to User mapping
router.get('/role2user/:user_id',role2user);// Create Form Role 2 User
router.post('/role2user/:user_id',bodyParser,role2user_create_update); // POST - Update Form
//Roles routes -- End


module.exports = router;