const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');
const secretkey = 'raj123';
const verifyToken = (req,res,next) =>{
    let token = JSON.parse(localStorage.getItem('userToken'));
    jwt.verify(token,secretkey, function(err,decoded){
        if(err){
            res.redirect('/admin')
        }else{
            next();
        }
    });
}
 
module.exports = verifyToken;