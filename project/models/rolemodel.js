const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    rolename:String,
    permission:Object,
    
    
});

const roleModel = new mongoose.model('roledtails',roleSchema);
module.exports = roleModel