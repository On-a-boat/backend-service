const express = require("express");
const email = require("../controllers/emailController");
const router = express.Router();

// allow admin to search a list of users by inputing age, keywords 
router.get("/", filter.findAll);


module.exports = router;