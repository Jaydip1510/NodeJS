// const express = require('express');
// const subcatModel = require('../models/categorymodel');

// const app = express();
// // const bodyParser = require('body-parser');
// app.use(express.json());

// const getsubcategory = async (req,res)=>{
//     let getAllCat = await subcatModel.find();
//     let len = getAllCat.length+1;
//     const name = req.body.name;
//     const id = req.body.id;
//     const checkName = await categoryModel.findOne({categoryname:categoryname})
    
//     if(checkName){
        
//             req.flash('success', 'Category already exists');
//             res.render('category',{
//                 username: req.cookies.UserName,
//                 getAllCat: getAllCat,
//                 message2: req.flash('success'),
//                 editcat:''
//             });
//     } else {
//         const result = {
//             id: len,
//             catname: categoryname
//         }
//         const savedata = new model(result);
//         await savedata.save();
//         getAllCat = await categoryModel.find();
//         req.flash('success', 'Category added successfully');
//         res.render('category',{
//             username: req.cookies.UserName,
//             getAllCat: getAllCat,
//             message2: req.flash('success'),
//             editcat:''
//         }); 
//     }
    

// }



// module.exports = getsubcategory;