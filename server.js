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
// app.use("/filter", require("./routes/filter"));
// app.use("/statistics", require("./routes/statistics"));

// Get the information of the a user by userid 
app.get("/users/:userid", (req, res) => {
  const id = req.params.userid;
  const queryString = "SELECT * FROM User WHERE Id = ?"
  con.connect(function (err) {
    con.query(queryString, [id], function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });
  });
});


// Filtering a list of user by age, gender and keywords, send all the information 
app.get("/:lowage/:highage/:gender/:keywords", (req,res) => {
  // Age may need to have a default value
  const low = req.params.lowage;
  const high = req.params.highage;
  var gender = req.params.gender;
  // If admin select 'All', not complete yet
  if (gender == "2"){
    gender = "0 AND 1"
  }
  const keywords = '%' + req.params.keywords + '%';

  const queryString = "SELECT * FROM User WHERE Age BETWEEN ? AND ? AND Gender = ? AND Keywords LIKE ?"

  con.connect(function (err) {
    con.query(queryString, [low, high, gender, keywords], function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });
  });

})


/*
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



// // The first page maybe the login page, but I haven't study react so... for now just keep it
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/login.html"));
// });

// The first page maybe the login page, but I haven't study react so... for now just keep it

 app.get("*", (req, res) => {
   res.send("<h1>helloo guys</h1>");
 });
