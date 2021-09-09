const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Use express' inbuilt body parser
app.use(express.json(), cors());

// App routes
app.use("/filter", require("./routes/filter"));
app.use("/statistics", require("./routes/statistics"));

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
