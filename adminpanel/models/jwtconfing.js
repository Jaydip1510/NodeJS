const jwt = require('jsonwebtoken');
const secretkey = 'raj123';
const verifyToken = (token) =>{
    jwt.verify(token,secretkey, function(err,decoded){
        console.log(decoded.foo);
    });
}
 
module.exports = verifyToken