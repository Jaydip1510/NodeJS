const express = require('express');

const router = express.Router();
const {registerdata} = require("../controllers/index");
router.route('/movieinfo').get(registerdata);

module.exports = router;




