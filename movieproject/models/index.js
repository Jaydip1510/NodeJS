const express = require('express');
const app = express();
const body = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
let imgfilename = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./upload/");
    },
    filename: function (req, file, cb) {
        imgfilename = Date.now() + file.originalname;
        return cb(null, imgfilename);
    }
});
const upload = multer({ storage: storage });

const mainpath = path.join(__dirname, "../public");
app.use(express.static(mainpath));
app.use(express.static('upload'));
const imgmainpath = path.join(__dirname, "../upload");
app.set("view engine", "ejs");
const bodyparse = body.urlencoded({ extended: false });

const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/movies";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const studentSchema = new mongoose.Schema({
    id:Number,
    name:String,
    releasedate:Date,
    noOfcharacters:Number,
    posterimage:String, 
});

const studentModel = new mongoose.model('movieinfo',studentSchema);
module.exports = studentModel
