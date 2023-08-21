const express = require('express');

const router = express.Router();
const {registerdata} = require("../controllers/index");
router.get('/movieinfo',registerdata);

module.exports = router;




