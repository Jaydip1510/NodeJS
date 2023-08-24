const express = require('express');
const router = express.Router();
const {getDashboard,register,checkUserData} = require("../controllers/usercontrollers");

router.get('/dashboard',getDashboard);
router.post('/register',register);
router.post('/login',checkUserData);

module.exports = router;