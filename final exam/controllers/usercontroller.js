const registerModel = require('../models/registermodel');
const employeeModel = require('../models/employeemodel');


const getdeshboard = async (req,res) =>{
    res.render('index');
}

const getregister = async (req,res) =>{
    res.render('register');
}

const register = async (req, res) => {
    console.log(req.body);
    const res2 = new registerModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,

    });
    const abc = await res2.save()
    res.render('login');

}

const checkUserData = async (req, res) => {
    const dataUser = await registerModel.findOne({ email: req.body.email, password: req.body.password });
    if (dataUser) {
        res.cookie('UserName', dataUser.username);
        res.redirect('/admin');
    } else {
        res.render('login');
    }
}



const gettable = async (req, res) => {
    res.render('table',{
        empData:''
    });
}

const empgetdata = async (req, res) => {

    const res2 = new employeeModel({
        name: req.body.name,
        age: req.body.age,
        salary: req.body.salary,
        address: req.body.address,
        education: req.body.education

    });
    const abc = await res2.save()
    res.redirect('/form');

}

const getform = async (req, res) => {
    const empData = await employeeModel.find();
    res.render('form',{
        empData: empData,
        editempdata:''
    });
}

const deletedata = async (req, res) => {

    let id = req.params.id;
    console.log(id);
    const deletedata = await employeeModel.findByIdAndRemove({_id:id});
    res.redirect('/form');

}

const editdata = async (req, res) => {
    let id = req.params.id;
    let edata = await employeeModel.find();
    result = await employeeModel.findOne({_id:id})
    res.render('/form',{
        empData: edata,
        editempdata : result
    })
}


module.exports = {
    getdeshboard,
    getregister,
    register,
    checkUserData,
    getform,
    gettable,
    empgetdata,
    deletedata,
    editdata
   
} 