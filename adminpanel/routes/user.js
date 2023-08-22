const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const passport = require('passport');
const router = express.Router();
const {getDashboard,getdata,getpostdata,gettable,checkUserData,registerdata,getchart,getwidgets,getbutton,gettypography} = require("../controllers/usercontroller");


router.get('/admin',getDashboard);
router.get('/userform',getdata);
router.post('/userform/savedata',bodyParser,getpostdata);
router.get('/usertable',gettable);
router.get('/chart',getchart);
router.get('/widget',getwidgets);
router.get('/button',getbutton);
router.get('/typography',gettypography);
router.post('/register',bodyParser,registerdata);
// router.post('/dataUser',bodyParser,checkUserData);

router.post(
    '/login',
    passport.authenticate('local',{
        successRedirect:"/admin",
        failureRedirect:"/",
      }),
      async (req, res) => {
        res.send("done");
      }
    );
module.exports = router;