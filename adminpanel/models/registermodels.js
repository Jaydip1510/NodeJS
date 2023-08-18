const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/admin";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const studentSchema = new mongoose.Schema({
    id:Number,
    email:{
    type:String,
    required:true,
    unique:true,
    },
    password:String,
    username:String,
    
});

const studentModel = new mongoose.model('registerdata',studentSchema);
module.exports = studentModel