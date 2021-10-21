const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Use express' inbuilt body parser
app.use(express.json(), cors());

// App routes
app.use("/filter", require("./routes/filter"));
app.use("/group", require("./routes/group"));
app.use("/email", require("./routes/email"));
app.use("/admin", require("./routes/admin"));
app.use("/statistics", require("./routes/statistics"));

app.get("*", cors("local"), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for a Single Route" });
});


app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});

// default page
app.get("*", (req, res) => {
  res.send("<h1>helloo guys</h1>");
});

module.exports = app