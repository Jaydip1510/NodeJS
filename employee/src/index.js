const express = require('express');
const app = express();
const body = require('body-parser');
const path = require('path');
const mainpath = path.join(__dirname, '../public');
app.use(express.static(mainpath));
app.set('view engine', 'ejs');
const bodyparse = body.urlencoded({ extended: false });
const mongo = require('mongodb');
const mongoclient = mongo.MongoClient;
const url = 'mongodb://127.0.0.1:27017/';
const client = new mongoclient(url);

async function getdata() {
    try {
        await client.connect();
        console.log('connect to database...');
        const db = await client.db('user');
        const collection = db.collection('edata');
        const userdata = await collection.find({}).toArray();
        app.get("/mydata", async (req, res) => {
            res.render("index", {
                data: userdata
            });
        });
        app.post('/empdata',bodyparse,async (req, res) => {
            console.log(req);
            let data = {
                id: (userdata.length + 1).toString(),
                name:req.body.name,
                age:req.body.age,
                salary:req.body.salary,
                gender:req.body.g1,
                address:req.body.address
            }
            userdata.push(data);
            let result = await collection.insertOne(data);
            console.log(result);
            res.redirect('mydata');
        });

       app.get('/del/:id', async (req, res) => {
            let id = req.params.id;
            await collection.deleteOne({ id: id });
            app.get("/mydata", async (req, res) => {
                res.render("index", {
                    data: userdata
                });
            });
       });
        
    }catch(err) {
        console.log(err);
    }
}
getdata();
app.get('/', (req, res) => {
    console.log("Hello mongodb....");
});

app.listen(9008, "127.0.0.1", () => {
    console.log("listen on 9008...");
})
