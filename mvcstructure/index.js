//mvcstructures 

// const express = require('express');

// const app = express();

// const routes = require('./routes/index');
// app.use(routes);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
//   res.end();
// });

// app.listen(3001, () => {
//   console.log('Example app listening on port 3000!');
// });

// mongoose database

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const mongoose = require('mongoose');

const abc = async ()=>{
    const url = 'mongodb://127.0.0.1:27017/admin';
    const connect = await mongoose.connect(url);

    const empSchema = new mongoose.Schema({
        id:Number,
        name:String,
        age:Number,
        salary:Number,   
    });
    const emp = mongoose.model('employee',empSchema);

    const data = new emp({
        id:1,
        name:"jaydip",
        age:25,
        salary:30000,
    });
    const result = await data.save();
    console.log("Successfully data inserted...");
}
abc();

app.listen(3000,()=>{
    console.log("Server is running on port 3000...");
})

