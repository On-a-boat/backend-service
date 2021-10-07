const con = require("../middleware/db");

const showAll = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  const queryString =
    "SELECT UserId, firstName,lastName,age,gender,freq,email FROM newUser";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get all the user information
const findAll = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  const queryString = "SELECT * FROM newUser";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get the information of the a user by userid
const findUser = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  const id = req.query.userId;
  const queryString = "SELECT * FROM newUser WHERE UserId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Filtering a list of user by age, gender and keywords, send all the information
const findUserByKeyword = async (req, res) => {
  // default value for key and gender in queryString
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  var keywordString = "";
  if (req.query.keywords) {
    const array = req.query.keywords.split(",");
    for (i = 0; i < array.length; i++) {
      keywordString += " AND Keywords LIKE '" + "%" + array[i] + "%'";
    }
  }

  const queryString = "SELECT * FROM User WHERE Age < 999" + keywordString;

  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

module.exports = { showAll, findAll, findUser, findUserByKeyword };
