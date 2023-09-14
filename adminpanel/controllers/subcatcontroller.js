let subcatModel = require('../models/subcategorymodel');
const express = require('express');
const app = express();

const subcat = async (req, res) => {
    res.render('subcat', { username: req.cookies.UserName, selected: 'subcat' });
}

module.exports = subcat;