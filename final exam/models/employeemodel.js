const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name:String,
    age:Number,
    salary:Number,
    address:String,
    education:String,
    
});  
const employeeModel = new mongoose.model('employeedata',employeeSchema);

module.exports = employeeModel