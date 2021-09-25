const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Use express' inbuilt body parser
app.use(express.json(), cors());

// connect to mysql database 
const con = mysql.createConnection({
  host: "mysql-db-team-90.czjflueg9kom.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "on-a-boat",
  database: "Newhope",
});

// NOT USING
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.end();
// });

// App routes
// app.use("/filter", require("./routes/filter"));
// app.use("/statistics", require("./routes/statistics"));

// get the information of the a user by userid 
// for testing, userid is been changed to age 
app.get("/users/:userid", (req, res) => {
  const id = req.params.userid;
  const queryString = "SELECT * FROM User WHERE Age = ?"
  con.connect(function (err) {
    con.query(queryString, [id], function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });
  });
});

/*
app.get("/:lowage/:highage/:", (req.res))


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
