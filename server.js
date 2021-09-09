const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();

// Use express' inbuilt body parser
app.use(express.json(), cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// App routes
app.use("/filter", require("./routes/filter"));
app.use("/statistics", require("./routes/statistics"));

app.listen(port, () => {
	console.log(`The app is listening on port ${port}`);
});

// The first page maybe the login page, but I haven't study react so... for now just keep it
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/login.html"));
});
