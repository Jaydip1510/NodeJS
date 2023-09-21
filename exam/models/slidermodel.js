const mongoose = require('mongoose');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/userdata";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();

const sliderSchema = new mongoose.Schema({
    image:String,
    
});

const sliderModel = new mongoose.model('sliderdata',sliderSchema);
module.exports = sliderModel