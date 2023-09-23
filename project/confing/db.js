const mongoose = require('mongoose');

const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/blog";
    await mongoose.connect(url);
    console.log('established connection');
    
}
maindata();