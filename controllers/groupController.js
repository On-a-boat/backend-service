const con = require("../middleware/db");

//UPDATE MyGroups SET emailDestination=GroupId;

// Get all group's information
const getAllGroup = async (req, res) => {
  const queryString = "SELECT * FROM Newhope.MyGroups";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};
// Get all information from users from a group by groupId
const getGroup = async (req, res) => {
  const id = req.query.groupId;
  var userList = [];
  // Use the result of the first query to search users
  const queryString = "SELECT Users FROM Newhope.MyGroups WHERE id = ?";
  const queryString2 = "SELECT * FROM User WHERE id in ";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) {
      userList = "(" + result[0].Users + ")";
      con.query(queryString2 + userList, function (err, data, fields) {
        if (err) res.send(err);
        if (data) res.json(data);
      });
    }
  });
};

// Create a group base on name, id list and keywords.
const createGroup = async (req, res) => {
  const { groupName, users, userCount, dateCreated } = req.body;
  const queryString =
    "INSERT INTO MyGroups (groupName, users, userCount, dateCreated) VALUES (?, ?, ?, ?)";
  con.query(
    queryString,
    [groupName, users, userCount, dateCreated],
    function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send("sucess!");
    }
  );
  const queryStringUpdate = "UPDATE MyGroups SET emailDestination=GroupId;";
  con.query(queryStringUpdate, function (err, data, fields) {
    if (err) res.send(err);
    if (data) res.json(data);
  });
};

// Create a group base on name, id list and keywords.
const modifyGroup = async (req, res) => {
  const { groupName, users, userCount, dateCreated } = req.body;
  const queryString =
    "INSERT INTO MyGroups (groupName, users, userCount, dateCreated) VALUES (?, ?, ?, ?)";
  con.query(
    queryString,
    [groupName, users, userCount, dateCreated],
    function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send("sucess!");
    }
  );
};
module.exports = { getAllGroup, getGroup, createGroup, modifyGroup };
