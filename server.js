const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Use express' inbuilt body parser
app.use(express.json(), cors());

const con = mysql.createConnection({
  host: "on-a-boat-weey-instance-1.czjflueg9kom.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "on-a-boat",
  database: "Newhope",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.end();
});

// App routes
// app.use("/filter", require("./routes/filter"));
// app.use("/statistics", require("./routes/statistics"));
app.get('/users', (req, res) => {
  con.connect(function(err) {
      con.query(`SELECT * FROM user;`, function(err, result, fields) {
        if (err) res.send(err);
        if (result) res.send(result);
      });
  }); 
});


app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});

// // The first page maybe the login page, but I haven't study react so... for now just keep it
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/login.html"));
// });

// The first page maybe the login page, but I haven't study react so... for now just keep it

// app.get("*", (req, res) => {
//   res.send("<h1>helloo guys</h1>");
// });
