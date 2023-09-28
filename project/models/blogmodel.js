const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:String,
    shortdescription:String,
    longdescription:String,
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:'registerdata'},
    createdOn:{type: Date, default: Date.now},
    updatedOn:{type: Date}

    
});

const blogModel = new mongoose.model('blogdtails',blogSchema);
module.exports = blogModel