const express = require('express');
const getdata = require('../controllers/index');

const router = express.Router();
router.get('/demo',getdata);  

module.exports = router;
    

