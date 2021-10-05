const express = require("express");
const group = require("../controllers/groupController");
const router = express.Router();

// Get all groups
router.get("/", group.getAllGroup);

// Get single groups's user list
router.get("/find", group.getGroup);

// Create a new group
router.post("/", group.createGroup);

module.exports = router;