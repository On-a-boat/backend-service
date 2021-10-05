var nodemailer = require('nodemailer');

// Login to gmail
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onaboat90@gmail.com',
    pass: 'comp30022'
  }
});

module.exports = transporter;