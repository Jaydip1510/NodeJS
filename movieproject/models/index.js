const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/movies";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const studentSchema = new mongoose.Schema({
    id:Number,
    name:String,
    releasedate:Date,
    noOfcharacters:Number,
    posterimage:String, 
});

const studentModel = new mongoose.model('movieinfo',studentSchema);
module.exports = studentModel
