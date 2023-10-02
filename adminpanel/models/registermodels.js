const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    id:Number,
    email:{ type:String, required:true, unique:true },
    password:String,
    username:String,
    token:String,
    created_on:{ type: Date, default: Date.now },
    updated_on:{ type: Date, default: Date.now },
});

const registerModel = new mongoose.model('registerdata',registerSchema);

module.exports = registerModel