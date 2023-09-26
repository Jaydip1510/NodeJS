const express    = require('express');
const app        = express();
const path      = require('path');
app.use(express.static(__dirname));

const bodyParser = require('body-parser');
const cookie     = require('cookie-parser');
const session    = require('express-session');
const flash      = require('connect-flash');
const routes     = require('./routes/user');
const connection = require('./confing/db');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cookie());
app.use(session({secret:"secret-key",resave:true,saveUninitialized:true}));


app.use(flash());
app.use(routes);

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login',{ message:''});
})

app.get('/logout', (req, res) => {
    res.redirect('/')
});



app.get('/register', (req, res) => {
    res.render('register',{ message:''});
});

app.get('/', (req, res) => {
    res.render('login',{ message:''});
});

app.listen(8001,"127.0.0.1",()=>{
    console.log("listening port in 8001...");
})