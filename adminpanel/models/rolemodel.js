const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    id:Number,
    categoryname:String,

});


const roleModel = new mongoose.model('role',roleSchema);
module.exports = roleModel;
