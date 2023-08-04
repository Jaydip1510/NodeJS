const express = require("express");
const app = express();
const path = require("path");
const body = require("body-parser");

const mainpath = path.join(__dirname, "../public");
app.use(express.static(mainpath));

app.set("view engine", "ejs");
const bodyparse = body.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.write("<h1>My ToDo List</h1>");
  res.write("<h1>my first page</h1>");
  res.send();
});
let studdata = [
  {
    id: 1,
    name: "jaydip",
    age: 26,
    address: "panshina",
    gender: "male",
    email: "jay@gmail.com",
    hobby: ["cricket"],
  },
  {
    id: 2,
    name: "raj",
    age: 23,
    address: "limbdi",
    gender: "male",
    email: "raj@gmail.com",
    hobby: ["cricket"],
  },
];

app.get("/mylist", (req, res) => {
  res.render("index", {
    data: studdata,
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
  res.redirect("/mylist");
});

app.post("/listdata", bodyparse, (req, res) => {
  id = req.body.id;

  stud = {
    id: studdata.length + 1,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    gender: req.body.gender,
    email: req.body.email,
    hobby: req.body.h1,
  };
  studdata.push(stud);
  console.log(studdata);
  res.redirect("/mylist");
});
app.listen(8585, () => {
  console.log("server is running...");
});
