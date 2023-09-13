const express = require('express');
const app = express();

app.set('view engine','ejs');
const router = require('./routes/index');
app.use(express.static(__dirname));
app.use(router);
app.get('/', (req, res) => {
    res.render('index');
})

app.listen('8001',(req, res)=>{
    console.log('listening on port 8001');
})

