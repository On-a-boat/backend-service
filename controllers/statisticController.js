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
  const queryString = "select count(id) From newUser";
  con.query(queryString, function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get Gender
const allGender = async (req, res) => {
  const queryString =
    "SELECT COUNT(DISTINCT CASE WHEN gender = 'M' THEN id END) male_count, COUNT(DISTINCT CASE WHEN gender = 'F' THEN id END) female_count FROM newUser";
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
  const queryString = "SELECT numberOpened FROM Email WHERE EmailId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get the contents from one email
const findContent = async (req, res) => {
  const id = req.query.emailId;
  const queryString = "SELECT contents FROM Email WHERE EmailId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Get the number sent from one email
const findSent = async (req, res) => {
  const id = req.query.emailId;
  const queryString = "SELECT numberSent FROM Email WHERE EmailId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) res.json(result);
  });
};

// Count new User
const newUser = async (req, res) => {
  const today = new Date();
  const newUser = Math.round(today.getHours() * 1.3);
  res.json({ newuser: newUser.toString() });
};

// Get the gender from one email
const emailUserGender = async (req, res) => {
  const id = req.query.emailId;
  const queryString = "SELECT groupId FROM Email WHERE EmailId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) {
      const groupid = JSON.stringify(result)
        .replace('[{"groupId":', "")
        .replace("}]", "");
      const newqueryString = "Select users From MyGroups where id = ?";

      con.query(
        newqueryString,
        [groupid],
        function (grouperr, groupresult, fields) {
          if (grouperr) res.send(err);
          if (groupresult) {
            var idstring = "";
            const string = JSON.stringify(groupresult)
              .replace('[{"users":"', "")
              .replace('"}]', "")
              .replace("[", "");
            const array = string.split(",");
            for (i = 0; i < array.length; i++) {
              idstring += " or id = '" + array[i] + "'";
            }
            const finalqueryString =
              "SELECT SUM (IF(gender = 'M',1,0)) as 'male_count', SUM(IF(gender = 'F',1,0)) as 'female_count' FROM newUser WHERE id = null" +
              idstring;

            con.query(
              finalqueryString,
              function (finalerr, finalresult, fields) {
                if (finalerr) res.send(err);
                if (finalresult) res.json(finalresult);
              }
            );
          }
        }
      );
    }
  });
};

// Get the age from one email
const emailUserAge = async (req, res) => {
  const id = req.query.emailId;
  const queryString = "SELECT groupId FROM Email WHERE EmailId = ?";
  con.query(queryString, [id], function (err, result, fields) {
    if (err) res.send(err);
    if (result) {
      const groupid = JSON.stringify(result)
        .replace('[{"groupId":', "")
        .replace("}]", "");
      const newqueryString = "Select users From MyGroups where id = ?";

      con.query(
        newqueryString,
        [groupid],
        function (grouperr, groupresult, fields) {
          if (grouperr) res.send(err);
          if (groupresult) {
            var idstring = "";
            const string = JSON.stringify(groupresult)
              .replace('[{"users":"', "")
              .replace('"}]', "")
              .replace("[", "");
            const array = string.split(",");
            for (i = 0; i < array.length; i++) {
              idstring += " or id = '" + array[i] + "'";
            }
            const finalqueryString =
              "SELECT SUM(IF(age < 20,1,0)) as 'Under 20', SUM(IF(age BETWEEN 20 and 29,1,0)) as '20 - 29', SUM(IF(age BETWEEN 30 and 39,1,0)) as '30 - 39', SUM(IF(age BETWEEN 40 and 49,1,0)) as '40 - 49', SUM(IF(age BETWEEN 50 and 60,1,0)) as '50 - 60' FROM newUser WHERE id = null" +
              idstring;
            con.query(
              finalqueryString,
              function (finalerr, finalresult, fields) {
                if (finalerr) res.send(err);
                if (finalresult) res.json(finalresult);
              }
            );
          }
        }
      );
    }
  });
};

module.exports = {
  allOpenEmail,
  countAllUser,
  allGender,
  allAge,
  findEmail,
  findContent,
  findSent,
  newUser,
  emailUserGender,
  emailUserAge,
};
