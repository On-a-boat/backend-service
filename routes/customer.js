const express = require("express");
const customerController = require("../controllers/customerController.js");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// register customer
router.post("/register", customerController.registerCustomer);
router.post("/login", customerController.loginCustomer);
router.get("/me", verifyToken, customerController.getCustomer);

module.exports = router;
