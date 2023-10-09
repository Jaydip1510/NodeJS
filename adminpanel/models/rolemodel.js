const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({

    rolename:String,
    isActive:{
        type:Boolean,
    }
});


const roleModel = new mongoose.model('role',roleSchema);
module.exports = roleModel;
