const mongoose = require('mongoose');

 const productSchema = new mongoose.Schema({
         pname: String,
         price: Number,
         image: String,
         cat_id:{type: mongoose.Schema.Types.ObjectId, ref:'categorydata'},
         sub_id:{type: mongoose.Schema.Types.ObjectId, ref:'subcategory'}
   });

 const productModel = new mongoose.model('product',productSchema);
 module.exports = productModel