const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    id:Number,
    categoryname:String,

});

// const subCategorySchema = new mongoose.Schema({
//     name: String,
//     categorydatas: [{ type: mongoose.Types.ObjectId, ref: 'categorydata' }]
//   });

const categoryModel = new mongoose.model('categorydata',categorySchema);
// const subcatModel = new mongoose.model('subcategory',subCategory);
module.exports = categoryModel;
