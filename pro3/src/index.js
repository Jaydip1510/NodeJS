const express = require('express');
const app = express();
const path = require('path');
const body = require("body-parser");
const bodyparse = body.urlencoded({ extended: false });

const mainpath = path.join(__dirname, "../views");
const main = path.join(__dirname,"../public")
app.use(express.static(main));
app.use(express.static(mainpath));
app.use(express.static('../image'));


app.set('view engine','ejs');
app.get('/home',(req,res)=>{
    res.render('home')   
});
app.get('/aboutus',(req,res)=>{
    res.render('aboutus')   
});
app.get('/contactus',(req,res)=>{
    res.render('contactus')   
});

let studdata = [
    {
      id: 1,
      name: "jaydip",
      age: 26,
      address: "panshina",
      gender: "male",
      email: "jay@gmail.com",
      hobby:["cricket"]
    },
    {
      id: 2,
      name: "raj",
      age: 23,
      address: "limbdi",
      gender: "male",
      email: "raj@gmail.com",
      hobby:["cricket"]
    },
  ];
  
  app.get('/form',(req,res)=>{
       res.render("form", {
        data:studdata  
       });
  });
  
  app.get("/del/:id", (req, res) => {
    let id = req.params.id;
    id = id - 1;
    studdata.splice(id, 1);
    let j = 1;
    studdata.forEach((i) => {
      i.id = j;
      j++;
    });
    res.redirect("/form");
  });
  
  app.post("/listdata",bodyparse,(req,res)=>{
    id = req.body.id;
    stud = {
       id:studdata.length+1,
       name:req.body.name,
       age:req.body.age,
       address:req.body.address,
       gender:req.body.gender,
       email:req.body.email,
       hobby:req.body.h1,
    };
    studdata.push(stud);
    res.redirect("/form");
  });
 
app.listen(8005, () =>{
    console.log("server is running...");
  })