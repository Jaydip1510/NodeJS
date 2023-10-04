const mongoose = require('mongoose');
const apicategorySchema = new mongoose.Schema({
    id:Number,
    categoryname:String,

});

const Apicategory = new mongoose.model('apicategory',apicategorySchema);
module.exports = Apicategory;
