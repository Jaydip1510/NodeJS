const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/admin";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const studentSchema = new mongoose.Schema({
    id:Number,
    name:String,  
    email:String,
    password:String,
    username:String,
    
});

const studentModel = new mongoose.model('adminstudent',studentSchema);
module.exports = studentModel