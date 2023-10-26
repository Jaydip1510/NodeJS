const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    username:String,
    email:{ type:String, unique:true },
    password:String
    
});  
const registerModel = new mongoose.model('registerdata',registerSchema);

module.exports = registerModel