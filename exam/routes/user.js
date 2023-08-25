const express = require('express');
const router = express.Router();
const {getDashboard,register,checkUserData,getform} = require("../controllers/usercontrollers");

router.get('/dashboard',getDashboard);
router.get('/userform',getform);
router.post('/register',register);
router.post('/login',checkUserData);

module.exports = router;