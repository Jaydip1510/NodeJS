const registerModel = require('../models/registermodel');


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
    console.log(dataUser)
    if (dataUser) {
        res.cookie('UserName', dataUser.username);
        res.redirect('/admin');
    } else {
        res.render('login');
    }
}

module.exports = {
    getdeshboard,
    getregister,
    register,
    checkUserData
} 