const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    id:Number,
    username:{ type:String, required:true, unique:true },
    email:{ type:String, required:true, unique:true },
    password:String,
    confirmPassword:String
    
});

const registerModel = new mongoose.model('registerdata',registerSchema);
module.exports = registerModel