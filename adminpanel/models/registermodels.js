const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    id:Number,
    email:{ type:String, required:true, unique:true },
    password:String,
    username:String,
    token:String,
    role_id:{type: mongoose.Schema.Types.ObjectId, ref:'role'},
    created_on:{ type: Date, default: Date.now },
    updated_on:{ type: Date, default: Date.now },
});

const registerModel = new mongoose.model('registerdata',registerSchema);

module.exports = registerModel