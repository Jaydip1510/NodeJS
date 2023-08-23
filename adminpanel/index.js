const express = require('express');
const initializingPassport = require('./controllers/passportconfig');
const app = express();
const routes = require('./routes/user');
const cookie = require('cookie-parser');
const session = require('express-session');
const MongoStore  = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');

app.use(cookie());
app.use(session({secret:"secret-key",resave:true,saveUninitialized:true}));

initializingPassport(passport);

//app.use(passport.initialize());
//app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
const dbUrl = "mongodb://127.0.0.1:27017/admin";
app.use(session({
    secret: 'testSecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create( {
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600 
     }) 
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }));


 app.use(passport.initialize());
 app.use(passport.session());

 app.set('view engine','ejs');
 app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(flash());
app.use(routes);

app.get('/',(req,res)=>{
    res.render("login",{ message:''});
})

app.get('/login',(req,res)=>{
    res.render("login",{ message: ''});
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