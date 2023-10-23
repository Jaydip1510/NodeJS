const express = require('express');
const app = express();
const routes = require('./routes/user');
const cookie = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','ejs');
app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(flash());
app.use(routes);

app.get('/',(req,res)=>{
   res.render("login");
})

app.get('/login',(req,res)=>{
   res.render("login");
})

app.listen(8500,"127.0.0.1",()=>{
    console.log("listening port in 8500...");
})