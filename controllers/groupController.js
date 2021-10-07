const con = require("../middleware/db")

// Get all group's information
const getAllGroup = async (req, res) => {
  const queryString = "SELECT * FROM Newhope.MyGroups"
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });


}
// Get all information from users from a group by groupId 
const getGroup = async (req, res) => {
    const id = req.query.groupId;
    var userList = [];
    const queryString = "SELECT Users FROM Newhope.MyGroups WHERE GroupId = ?"
    const queryString2 = "SELECT * FROM User WHERE UserId in "
    con.query(queryString, [id], function (err, result, fields) {
        if (err) res.send(err);
        if (result) {
            userList = "(" + result[0].Users + ")";
            con.query(queryString2 + userList, function (err, data, fields) {
                if (err) res.send(err);
                if (data) res.send(data);
              });
        }
      });

}

// Create a group base on name, userid list and keywords.
const createGroup = async (req, res) => {
  const {name, keywords, users} = req.body;
  const date = new Date();
  const queryString = "INSERT INTO MyGroups (Date,GroupName,GroupDescription,Users) VALUES (?, ?, ?, ?)";
  con.query(queryString, [date, name, keywords, users],function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.send("sucess!");
  });

}

module.exports = {getAllGroup, getGroup, createGroup};