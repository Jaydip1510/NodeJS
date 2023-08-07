const express = require('express');
const app = express();
const path = require('path');

const mainpath = path.join(__dirname,'../public')
app.use(express.static(mainpath));

app.get('/',(req,res)=>{
   res.write("<h1>Home Page</h1>")
   res.write("<h1>my first home page...</h1>")
   res.send();  
});

app.get('/user',(req,res)=>{
    res.sendFile(mainpath+'/'+'index.html')
});

app.get('/savedata',(req,res)=>{
    res.write("name is "+req.query.name)
    res.write("email is"+req.query.email)
    res.send();
})

app.listen(8000,"127.0.0.1",()=>{
    console.log("server is running on port 8000")
});