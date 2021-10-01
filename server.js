// This file contains everything for the current backend
// Routes and controller are not been seperate for impleting the basic functions 
// The contains of the server.js will be moved to the sub folder at next sprint

const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Use express' inbuilt body parser
app.use(express.json(), cors());

// Connect to mysql database 
const con = mysql.createConnection({
  host: "mysql-db-team-90.czjflueg9kom.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "on-a-boat",
  database: "Newhope",
});

// App routes 
// not use for now, will seprete the route/controller later 
// app.use("/filter", require("./routes/filter"));
// app.use("/statistics", require("./routes/statistics"));

// Get the information of the a user by userid 
app.get("/users", (req, res) => {
  const id = req.query.userid;
  const queryString = "SELECT * FROM User WHERE Id = ?"
  con.connect(function (err) {
    con.query(queryString, [id], function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });
  });
});


// Filtering a list of user by age, gender and keywords, send all the information 
app.get("/filter", (req,res) => {
  // Age may need to have a default value
  const low = req.query.low;
  const high = req.query.high;
  const ageString = " Age BETWEEN " + low + " AND " + high;

  // default value for key and gender in queryString
  var keywordString = "";
  var genderString = "";
  if (req.query.gender){
    genderString = " AND Gender = " + req.query.gender;
  }
  if (req.query.keywords){
    keywordString = " AND Keywords LIKE '" + "%" + req.query.keywords + "%'";
  }

  const queryString = "SELECT * FROM User WHERE" +  ageString + genderString + keywordString;

  con.connect(function (err) {
    con.query(queryString, function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });
  });

})


/* uncompleted route
app.post("/filters", (req,res) => {
  const 
  con.connect(function (err) {
    con.query
  })
})
*/ 

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});


// default page
 app.get("*", (req, res) => {
   res.send("<h1>helloo guys</h1>");
 });
