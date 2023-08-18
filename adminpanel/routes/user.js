const express = require('express');
const router = express.Router();
const {getDashboard,getdata,getpostdata,gettable} = require("../controllers/usercontroller");
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});

router.get('/admin',getDashboard);
router.get('/userform',getdata);
router.post('/userform/savedata',bodyParser,getpostdata);
router.get('/usertable',gettable);
module.exports = router;