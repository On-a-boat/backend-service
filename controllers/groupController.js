const con = require("../middleware/db")


// Get all information from users from a group by groupId 
const getGroup = async (req, res) => {
    const id = req.query.groupId;
    var userList = [];
    const queryString = "SELECT Users FROM Newhope.Group WHERE GroupId = ?"
    const queryString2 = "SELECT * FROM User WHERE UserId in "
    con.query(queryString, [id], function (err, result, fields) {
        if (err) res.send(err);
        if (result) {
            console.log(result[0].Users);
            userList = "(" + result[0].Users + ")";
            console.log(userList);
            con.query(queryString2 + userList, function (err, data, fields) {
                if (err) res.send(err);
                if (data) res.send(data);
              });
        }
      });

}

module.exports = {getGroup};