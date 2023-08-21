const express = require('express');

const router = express.Router();
const {getemp} = require("../controllers/index");
router.route('/emp').get(getemp);

module.exports = router;




