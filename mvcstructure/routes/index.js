const express = require('express');

const router = express.Router();
const {getuser,getemp} = require("../controllers/index");

router.route('/index').get(getuser);

router.route('/emp').get(getemp);

module.exports = router;




