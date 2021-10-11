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

// Get Age 
const allAge = async (req, res) => {
    const queryString = 
    "SELECT SUM(IF(age < 20,1,0)) as 'Under 20', SUM(IF(age BETWEEN 20 and 29,1,0)) as '20 - 29', SUM(IF(age BETWEEN 30 and 39,1,0)) as '30 - 39', SUM(IF(age BETWEEN 40 and 49,1,0)) as '40 - 49', SUM(IF(age BETWEEN 50 and 59,1,0)) as '50 - 59', SUM(IF(age BETWEEN 60 and 69,1,0)) as '60 - 69', SUM(IF(age BETWEEN 70 and 79,1,0)) as '70 - 79', SUM(IF(age BETWEEN 80 and 89,1,0)) as '80 - 89' FROM newUser;";
    con.query(queryString, function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.json(result);
    });
  };


module.exports = { allOpenEmail, countAllUser, allGender , allAge};