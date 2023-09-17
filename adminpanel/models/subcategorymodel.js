const mongoose = require('mongoose');

 const subCategorySchema = new mongoose.Schema({
         id:Number,
         selectcategory:String,
         subcatname: String,
   });

 const subcatModel = new mongoose.model('subcategory',subCategorySchema);
 module.exports = subcatModel