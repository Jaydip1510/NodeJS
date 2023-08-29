const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/userdata";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const productSchema = new mongoose.Schema({
    id:Number,
    selectcategory:String,
    productname:String,
    productprice:Number,
    image:String,
    
});

const productModel= new mongoose.model('productdatas',productSchema);
module.exports = productModel