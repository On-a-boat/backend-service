// This file contains everything for the current backend
// Routes and controller are not been seperate for impleting the basic functions 
// The contains of the server.js will be moved to the sub folder at next sprint

const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Use express' inbuilt body parser
app.use(express.json(), cors());

// App routes 
// not use for now, will seprete the route/controller later 
app.use("/filter", require("./routes/filter"));
app.use("/group", require("./routes/group"));


app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});


// default page
 app.get("*", (req, res) => {
   res.send("<h1>helloo guys</h1>");
 });
