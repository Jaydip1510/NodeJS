const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:String,
    shortdescription:String,
    longdescription:String,
    createdOn:{type: Date, default: Date.now},
    updatedOn:{type: Date, default: Date.now}

    
});

const blogModel = new mongoose.model('blogdtails',blogSchema);
module.exports = blogModel