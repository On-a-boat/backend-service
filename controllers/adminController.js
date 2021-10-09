const con = require("../middleware/db");

// Create a group base on name, userid list and keywords.
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const queryString =
    "SELECT Count(*) as exist FROM Adminn WHERE Username = ? AND Password = ?";
  con.query(queryString, [username, password], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.send(result);
  });
};

module.exports = { loginAdmin };
