const express = require('express')
const app = express();

const routes = require('./routes/user');
const cookie = require('cookie-parser');
app.use(cookie());
app.set('view engine','ejs');
app.use(express.static(__dirname));
app.use(routes);

app.get('/',(req,res)=>{
    res.render("login");
})

app.get('/login',(req,res)=>{
    res.render("login");
})

app.get('/logout', (req, res) => {
    res.clearCookie('UserName')
    res.redirect('/')

})

app.get('/register',(req,res)=>{
    res.render('register');
})
app.listen(8004,"127.0.0.1",()=>{
    console.log("listening port in 8003...");
})