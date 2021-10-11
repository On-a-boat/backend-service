const con = require("../middleware/db");

// Get all opened Email
const allOpenEmail = async (req, res) => {
  const queryString = "Select SUM(NumberOpened) From Email";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Count all User
const countAllUser = async (req, res) => {
  const queryString = "select count(userId) From newUser";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get Gender
const allGender = async (req, res) => {
  const queryString = 
  "SELECT COUNT(DISTINCT CASE WHEN gender = 'Male' THEN UserId END) male_count, COUNT(DISTINCT CASE WHEN gender = 'Female' THEN UserId END) female_count FROM newUser";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};



module.exports = { allOpenEmail, countAllUser, allGender };