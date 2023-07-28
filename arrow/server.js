const h1 = require('http');

const server = h1.createServer((req,res)=>{
   res.end("connection successfully");
});

server.listen(3000,"127.0.0.1",()=>{
    console.log("listening port");
});