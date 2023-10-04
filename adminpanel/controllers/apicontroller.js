
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

module.exports = api_category