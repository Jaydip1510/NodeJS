const mongoose = require('mongoose');
const apicategorySchema = new mongoose.Schema({
    id:Number,
    categoryname:String,

});

const apicategory = new mongoose.model('apicategory',apicategorySchema);
module.exports = apicategory;
