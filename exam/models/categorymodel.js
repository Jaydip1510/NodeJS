const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/userdata";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const categorySchema = new mongoose.Schema({
    id:Number,
    categoryname:String,
    
});

const categoryModel= new mongoose.model('jaydipdatas',categorySchema);
module.exports = categoryModel