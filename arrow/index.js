const h1 = require('http');
const server = h1.createServer((req, res) => {
  console.log('connection successfully');
})

server.listen(3000, () => {
  console.log('listening on port 3000');
})