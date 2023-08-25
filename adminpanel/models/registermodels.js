const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/admin";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const registerSchema = new mongoose.Schema({
    id:Number,
    email:{ type:String, required:true, unique:true },
    password:String,
    username:String,
    first_name:String,
    last_name:String,
    gender:String,
    mobile:String,
    location:String,
    created_on:{ type: Date, default: Date.now },
    updated_on:{ type: Date, default: Date.now },
});

const registerModel = new mongoose.model('registerdata',registerSchema);
module.exports = registerModel