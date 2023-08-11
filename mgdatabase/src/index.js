const express = require('express');
const app = express();
const body = require("body-parser");
const path = require("path");
const multer = require("multer");
let imgfilename = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, "./upload/");
    },
    filename: function (req, file, cb) {
        imgfilename = Date.now()+file.originalname;
       return cb(null, imgfilename);
    }
});
const upload = multer({storage: storage});

// create folder
// const upload = multer({dest:'./upload'})

const mainpath = path.join(__dirname, "../public");
app.use(express.static(mainpath));
app.use(express.static('upload'));
app.set("view engine", "ejs");
const bodyparse = body.urlencoded({ extended: false });
const mongo = require('mongodb');

const mongoclient = mongo.MongoClient;

const url = "mongodb://127.0.0.1:27017/";

const client = new mongoclient(url);
let udata = '';
async function getdata() {

    try {
        await client.connect();
        console.log("connect to db");
        const db = client.db('userinfo')
        const collection = db.collection('userdata');
        const userdata = await collection.find({}).toArray();
        console.log(userdata);


        // insert new records
        app.get("/mydb", (req, res) => {
            udata ='';
            res.render("index", {
                data: userdata,
                udata: udata
            });
        });
        app.post('/savedata', upload.single('img'), async (req, res) => {
            id = req.body.id;
            console.log(imgfilename);
            if (id != '') {
                udata = '';
                userdata.find((i) => {
                    if (i.id == id) {
                        i.name = req.body.name;
                        i.age = req.body.age;
                        i.email = req.body.email;
                        i.address = req.body.address;
                        i.img = imgfilename
                    }
                });
                let final = collection.updateOne({
                    id: id,
                }, {
                    $set: {
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email,
                        address: req.body.address,
                        img : imgfilename
                    }
                })
            } else {
                var data = {
                    id:(userdata.length + 1).toString(),
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email,
                    address: req.body.address,
                    img : imgfilename
                }
            userdata.push(data);

                let result = await collection.insertOne(data);
                console.log(result);
                    
            }
            res.redirect('mydb');
        });

        app.get('/del/:id', async (req, res) => {
            let id = req.params.id;
            console.log(id);

            let del = await collection.deleteOne({ id: id });
            let userdata1 = await collection.find({}).toArray();
            udata = ''
            res.render("index", {
                data: userdata1,
                udata: udata
            });

        });
        app.get('/edit/:id', async (req, res) => {
            let id = req.params.id;
            udata = userdata.find((i) => {
                return i.id == id;
            });
            console.log(udata);
            res.render("index", {
                udata: udata,
                data: userdata

            });

        });
    } catch (err) {
        console.log(err);
    }
}
getdata();
app.get('/', (req, res) => {
    console.log("Hello mongodb....");
});

app.listen(8005, "127.0.0.1", () => {
    console.log("listen on 8005...");
})
