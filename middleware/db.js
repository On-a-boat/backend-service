const mysql = require("mysql");

// consturct the database
const con = mysql.createConnection({
  host: "mysql-db-team-90.czjflueg9kom.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "on-a-boat",
  dateStrings: true,
  database: "Newhope",
});

// open the connection
con.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = con;
