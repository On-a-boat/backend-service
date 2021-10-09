const con = require("../middleware/db");

// Create a group base on name, userid list and keywords.
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const queryString =
    "SELECT * FROM Adminn WHERE Username = ? AND Password = ?";
  con.query(queryString, [username, password], function (err, result, fields) {
    if (err) res.send(err);
    if (result.length > 0) res.send(result);
    if (result.length <= 0) res.status(401).send(result);
  });
};

module.exports = { loginAdmin };
