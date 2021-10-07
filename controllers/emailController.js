const con = require("../middleware/db")
const mail = require("../middleware/mail")

// Get all email
const findAll = async (req, res) => {
    const queryString = "SELECT * FROM Email"
    con.query(queryString, function (err, result, fields) {
        if (err) res.send(err);
        if (result) res.json(result);
      });
}

// Send email and record it into database
const sendEmail = async (req, res) => {
    const {users, title, text, coupon} = req.body;
    const mailOptions = {
        from: "onaboat90@gmail.com",
        to: users,
        subject: title,
        text: text
    };
    const date = new Date();
    const len = users.length;

    const queryString = "INSERT INTO Email (Date,GroupDescription,Contents,NumberSent, Coupons) VALUES (?, ?, ?, ?, ?)";
    mail.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          con.query(queryString, [date, title, text, len, coupon], function (err, result, fields) {
            if (err) res.send(err);
            if (result) res.json(result);
          });
        }
      })

}
// 
module.exports = {findAll, sendEmail};