const express = require("express");
const admin = require("../controllers/adminController.js");
const router = express.Router();

// Post Admin authorisation
router.post("/login", admin.loginAdmin);

module.exports = router;
