const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({ extended: false });
const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/coronapanel";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const router = express.Router();

const {getdeshboard,getregister,register,checkUserData} = require("../controllers/usercontroller")

// main indexpage routes

router.get('/admin', getdeshboard);
router.get('/register',getregister);
router.post('/register',register);
router.post('/login',checkUserData);

module.exports = router;