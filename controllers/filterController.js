const con = require("../middleware/db");

const showAll = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const queryString =
    "SELECT id, firstName,lastName,age,gender,freq,email,keyword,Link FROM newUser";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get all the user information
const findAll = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const queryString = "SELECT * FROM newUser";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get the information of the a user by id
const findUser = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.query.id;
  const queryString = "SELECT * FROM newUser WHERE id = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Filtering a list of user by age, gender and keywords, send all the information
const findUserByKeyword = async (req, res) => {
  // default value for key and gender in queryString
  res.set("Access-Control-Allow-Origin", "*");
  var keywordString = "";
  if (req.query.keywords) {
    const array = req.query.keywords.split(",");
    for (i = 0; i < array.length; i++) {
      keywordString += " AND keyword LIKE '" + "%" + array[i] + "%'";
    }
  }
  // is User or newUser?
  const queryString = "SELECT * FROM newUser WHERE Age < 999" + keywordString;

  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

module.exports = { showAll, findAll, findUser, findUserByKeyword };
