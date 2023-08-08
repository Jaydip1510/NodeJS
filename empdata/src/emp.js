const {MongoClient} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';

const database = 'employee';

const client = new MongoClient(url);

async function getdata(){
    let res = await client.connect();
    let db = res.db(database);
    let collection = db.collection('empdata');
    let response = await collection.find({}).toArray();
    console.log(response);
}
getdata();