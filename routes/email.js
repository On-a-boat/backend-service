const express = require("express");
const email = require("../controllers/emailController");
const router = express.Router();

// allow admin to search a list of users by inputing age, keywords 
router.get("/", email.findAll);

// send Email and record it in database
router.post("/", email.sendEmail);


module.exports = router;