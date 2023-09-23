const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:String,
    shortdescription:String,
    longdescription:String,
    createdOn:Date,
    updatedOn:Date,

    
});

const blogModel = new mongoose.model('blogdtails',blogSchema);
module.exports = blogModel