const express = require('express')
const mongo = require('mongodb')

const mongoclient = mongo.MongoClient
const url = 'mongodb://127.0.0.1:27017/';

const client = new mongoclient(url);

async function getdata(){
    
    try{
        await client.connect();
        console.log("connect to db");
        const db = client.db('employee')
        const collection = db.collection('empdata');
        // const user = await collection.find({}).toArray();
        // console.log(user);

        // insert new records
        // const result = await collection.insertOne({
        //     empname:"raj",
        //     empage:"25",
        //     empno:"9106853634",
        //     empgender:"male",
        //     empaddress:"limbdi"
        // },(err,res)=>{
        //     if(err) throw err
        //     console.log("data inserted");
        // });
        // console.log(result);


        // insert multiple data

        // const emp = await collection.insertMany(
        //     [
        //         {
        //             empname:"jay",
        //             empage:"21",
        //             empno:"123467892",
        //             empgender:"male",
        //             empaddress:"surat"
        //         },
        //         {
        //             empname:"arjun",
        //             empage:"25",
        //             empno:"1244536855",
        //             empgender:"male",
        //             empaddress:"rajkot"
        //         },
        //         {
        //             empname:"RV",
        //             empage:"25",
        //             empno:"214566551",
        //             empgender:"male",
        //             empaddress:"vadodara"
        //         }
        //     ],(err,res)=>{
        //         if(err) throw err
        //     console.log("Inserted")
        //   })
        // console.log(emp)
        

        //Search data whose age is 25

        // const filterData = await collection.find({empage:"25"}).toArray();
        // console.log(filterData);

        // delete data in database
         
        // const deletedata = await collection.deleteMany({empage:"25"},(err,res)=>{
        // if(err) throw err
        // console.log("Deleted");
        // });
        // console.log(deletedata);

        // update data in database

        const updata = await collection.updateOne({empname:"raj"},{$set:{empname:"jaydip"}},(err,res)=>{
          if(err) throw err
          console.log("Updated data");
        });
        console.log(updata);

    }catch(e){
       console.log(e)
    }
}
getdata();
const app = express();

app.get('/',(res,req)=>{
    console.log("Hello...")
})

app.listen(8008,"127.0.0.1",()=>{
   console.log("listen on 8008");
})