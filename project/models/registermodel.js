const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    id:Number,
    username:String,
    email:{ type:String, required:true, unique:true },
    password:String,
    confirmPassword:String
    
});

const registerModel = new mongoose.model('registerdata',registerSchema);
module.exports = registerModel