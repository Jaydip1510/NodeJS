const express    = require('express');
const path = require('path');
const app        = express();
const mainpath = path.join(__dirname,"./movieproject");
app.use(express.static(mainpath));
app.use(express.static('uploads'));
const bodyParser = require('body-parser');
const cookie     = require('cookie-parser');
const session    = require('express-session');
const flash      = require('connect-flash');
const routes     = require('./routes/user');

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

app.get('/', (req, res) => {
    res.render('login',{ message:''});
});

app.get('/register', (req, res) => {
    res.render('register',{ message:''});
})

app.listen(8001,"127.0.0.1",()=>{
    console.log("listening port in 8001...");
})