const mongoose = require('mongoose');
const subcatSchema = new mongoose.Schema({
    id:Number,
    selectcategory:String,
    subcategory:String,

});

const subcatModel = new mongoose.model('subcategory',subcatSchema);
module.exports = subcatModel