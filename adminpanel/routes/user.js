const express = require('express');
const router = express.Router();
const {getDashboard,getdata,getpostdata} = require("../controllers/usercontroller");
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});

router.get('/admin',getDashboard);
router.get('/userform',getdata);
router.post('/userform/savedata',bodyParser,getpostdata);
module.exports = router;