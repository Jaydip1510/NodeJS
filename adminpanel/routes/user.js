const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({ extended: false });
// const passport = require('passport');
const router = express.Router();
const { getDashboard, getdata, getpostdata, gettable, checkUserData, registerdata, getchart, getwidgets, getbutton, gettypography,getotherElement,checkLogindata} = require("../controllers/usercontroller");


router.get('/admin', getDashboard);
router.get('/userform', getdata);
router.post('/userform/savedata', bodyParser, getpostdata);
router.get('/usertable', gettable);
router.get('/chart', getchart);
router.get('/widget', getwidgets);
router.get('/button', getbutton);
router.get('/typography', gettypography);
router.get('/element',getotherElement);
router.post('/register', bodyParser, registerdata);


router.post(
    "/login",bodyParser,checkLogindata
  );
//   passport.authenticate('local', (err, user, info) => {
    
//     if (err) {
//       req.flash('danger', 'Email or password wrong !!!');
//       res.render('login', { message: req.flash('danger') });
//     }
//     else if (!user) {
//       // res.render('login.html', { errorMessage: info.message });
//       req.flash('danger', info.message);
//       res.render('login', { message: req.flash('danger') });
//     }
//     else {
//       //setting users in session
//       req.logIn(user, function (err) {
//         if (err) {
//           // res.render('login.html', { error: err });
//           req.flash('danger', info.message);
//           res.render('login', { message: req.flash('danger') });
//         } else {
//           debugger;
//           res.cookie("UserName","admin");
//           res.redirect('/register');
//         }
//       })
//     }
//   })(req, res);
// });

// router.post(
//     '/login',(req, res) =>{

//       debugger;
//     passport.authenticate('local',{
//         failureRedirect:"/",
//         successRedirect:"/admin",
//         failureFlash : true,
//         failureMessage: true
//       },(req, res) =>{
//         console.log(req.session.messages);
//         debugger;
//         res.redirect('/');
//       }),
//       async (req, res) => {
//         debugger;
//         res.send("done");
//       }
//       debugger;
//     });
module.exports = router;