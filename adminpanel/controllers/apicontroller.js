
const apicategory = require('../models/apicategory')


const api_category = async(req,res) =>{
    const categoryname = req.body.categoryname;
    const result = {
    
        categoryname: categoryname
    }
    const savedata = new apicategory(result);
    let categorydata =  await savedata.save();
    res.json(categorydata);  
}

const api_categorydisplay = async(req,res) =>{
    const apicategorydata = apicategory.find({});
    res.json(apicategorydata);
}

module.exports = {api_category,api_categorydisplay}