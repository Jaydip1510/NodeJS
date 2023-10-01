const mongoose = require('mongoose');

const module_masterSchema = new mongoose.Schema({
    module_name:String
});

const module_masterModel = new mongoose.model('module_master',module_masterSchema);
module.exports = module_masterModel