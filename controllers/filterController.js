const con = require("../middleware/db");

// Get all the user information
const findAll = async (req, res) => {
    const queryString = "SELECT * FROM User"
    con.query(queryString, function (err, result, fields) {

        if (err) res.send(err);
        if (result) res.json(result);
      });
}

// Get the information of the a user by userid 
const findUser = async (req, res) => {
    const id = req.query.userId;
    const queryString = "SELECT * FROM User WHERE UserId = ?"
    con.query(queryString, [id], function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.json(result);
    });
  };
  

// Filtering a list of user by age, gender and keywords, send all the information 
const findUserByKeyword = async (req, res) => {
    // default value for key and gender in queryString
    var keywordString = "";
    if (req.query.keywords){
      const array = req.query.keywords.split(',');
      for (i = 0; i < array.length; i++){
        keywordString += " AND Keywords LIKE '" + "%" + array[i] + "%'";
      } 
    }
  
    const queryString = "SELECT * FROM User WHERE Age < 999" + keywordString;
  
    con.query(queryString, function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.json(result);
    });
  
  };
  
module.exports = {findAll, findUser, findUserByKeyword};
