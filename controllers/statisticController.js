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
  "SELECT SUM(IF(age < 20,1,0)) as 'Under 20', SUM(IF(age BETWEEN 20 and 29,1,0)) as '20 - 29', SUM(IF(age BETWEEN 30 and 39,1,0)) as '30 - 39', SUM(IF(age BETWEEN 40 and 49,1,0)) as '40 - 49', SUM(IF(age BETWEEN 50 and 60,1,0)) as '50 - 60' FROM newUser;";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get the OpenedEmail from one email
const findEmail = async (req, res) => {
  const id = req.query.emailId;
  const queryString = "SELECT NumberOpened FROM Email WHERE EmailId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get the contents from one email
const findContent = async (req, res) => {
  const id = req.query.emailId;
  const queryString = "SELECT Contents FROM Email WHERE EmailId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get the number sent from one email
const findSent = async (req, res) => {
  const id = req.query.emailId;
  const queryString = "SELECT NumberSent FROM Email WHERE EmailId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Count new User
const newUser = async (req, res) => {
  const today = new Date;
  const newUser = Math.round(today.getHours() * 1.3);
  res.json({newuser: newUser.toString()});
};

// Filtering the Gender of user by UserId
const findUserIdGender = async (req, res) => {
  var userIdstring = "";
  if (req.query.userIds) {
    const array = req.query.userIds.split(",");
    for (i = 0; i < array.length; i++) {
      userIdstring += " or userId = '"  +  array[i] + "'";
    }
  }

  const queryString = "SELECT SUM (IF(gender = 'Male',1,0)) as 'male_count', SUM(IF(gender = 'Female',1,0)) as 'female_count' FROM newUser WHERE userId = null" + userIdstring;

  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Filtering the Gender of user by UserId
const findUserIdAge = async (req, res) => {
  var userIdstring = "";
  if (req.query.userIds) {
    const array = req.query.userIds.split(",");
    for (i = 0; i < array.length; i++) {
      userIdstring += " or userId = '"  +  array[i] + "'";
    }
  }

  const queryString = "SELECT SUM(IF(age < 20,1,0)) as 'Under 20', SUM(IF(age BETWEEN 20 and 29,1,0)) as '20 - 29', SUM(IF(age BETWEEN 30 and 39,1,0)) as '30 - 39', SUM(IF(age BETWEEN 40 and 49,1,0)) as '40 - 49', SUM(IF(age BETWEEN 50 and 60,1,0)) as '50 - 60' FROM newUser WHERE userId = null" + userIdstring;

  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

module.exports = { allOpenEmail, countAllUser, allGender , allAge, findEmail, findContent, findSent, newUser, findUserIdGender, findUserIdAge};