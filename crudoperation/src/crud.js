const express = require("express");
const app = express();
const body = require("body-parser");
const path = require("path");

const mainpath = path.join(__dirname, "../public");
app.use(express.static(mainpath));

app.set("view engine", "ejs");
const bodyparse = body.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.write("<h1>My Home Page</h1>");
  res.write("<h1>my first page</h1>");
  res.send();
});
let edituser = "";
let userdata = [
  {
    id: 1,
    name: "jay",
    email: "jay@gmail.com",
    age: 18,
    gender:"male",
  },
  {
    id: 2,
    name: "jaydip",
    email: "jaydip@gmail.com",
    age: 26,
    gender:"male",
  },
  {
    id: 3,
    name: "raj",
    email: "raj@gmail.com",
    age: 22,
    gender:"male",
  },
  {
    id: 4,
    name: "arjun",
    email: "arjun@gmail.com",
    age: 24,
    gender:"male",
  },
  {
    id: 5,
    name: "dhoni",
    email: "dhoni@gmail.com",
    age: 42,
    gender:"male",
  },
];
app.get("/mycrud", (req, res) => {
  res.render("crud", {
    data: userdata,
    edituser: edituser,
  });
});

app.get("/del/:id", (req, res) => {
  let id = req.params.id;
  id = id - 1;
  userdata.splice(id, 1);
  let j = 1;
  userdata.forEach((i) => {
    i.id = j;
    j++;
  });
  res.redirect("/mycrud");
});

app.post("/savedata", bodyparse, (req, res) => {
  id = req.body.id;
  if (id != "") {
    //update
    userdata.forEach((i) => {
      if (i.id == id) {
        i.name = req.body.name;
        i.email = req.body.email;
        i.age = req.body.age;
        i.gender = req.body.gender
      }
    });
  } else {
    //push
    data = {
      id: userdata.length + 1,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      gender:req.body.gender,
    };
    userdata.push(data);
  }

  res.redirect("/mycrud");
});

app.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  (edituser = userdata.find((i) => {
    return i.id == id;
  })),
    res.render("crud", {
      data: userdata,
      edituser: edituser,
    });
});
app.listen(9000, () => {
  console.log("server running...");
});
