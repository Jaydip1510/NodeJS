const express = require('express');
const path = require('path');
const app = express();
const mainpath = path.join(__dirname, "../public");
app.use(express.static(mainpath));
app.set('view engine', 'ejs');
async function main() {
   try {
      const routs = require('./routes/user');
      app.use(routs);

   } catch (e) {
       console.error(e);
   }
}
main()
app.listen(8001, "127.0.0.1", () => {
   console.log("listen port 8001");
})