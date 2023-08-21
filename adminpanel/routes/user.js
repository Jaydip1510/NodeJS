const express = require('express');
const router = express.Router();
const {getDashboard,getdata,getpostdata,gettable,checkUserData,registerdata,getchart,getwidgets,getbutton,gettypography} = require("../controllers/usercontroller");
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});

router.get('/admin',getDashboard);
router.get('/userform',getdata);
router.post('/userform/savedata',bodyParser,getpostdata);
router.get('/usertable',gettable);
router.get('/chart',getchart);
router.get('/widget',getwidgets);
router.get('/button',getbutton);
router.get('/typography',gettypography);
router.post('/register',bodyParser,registerdata);
router.post('/dataUser',bodyParser,checkUserData);
module.exports = router;