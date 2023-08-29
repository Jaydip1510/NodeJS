const express = require('express');
const body = require('body-parser');
app = express();
const router = express.Router();
const multer = require('multer');
const model = require('../models/productmodel');
const bodyParser = body.urlencoded({ extended: false });
app.use(express.static('uploads'));
let iname = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        iname = Date.now() + file.originalname;
        return cb(null, iname);
    }
 });
const upload = multer({ storage: storage });
console.log(iname);
const {getDashboard,register,checkUserData,getform,categorydata,getproduct,productdetails} = require("../controllers/usercontrollers");

router.get('/dashboard',getDashboard);
router.get('/userform',getform);
router.post('/register',register);
router.post('/login',checkUserData);
router.post('/categorydata',bodyParser,categorydata);
router.get('/product',getproduct);
router.post('/productdetails',bodyParser,productdetails);

module.exports = router;