const express = require("express");
const filter = require("../controllers/filterController");
const router = express.Router();

// Get part of user information
router.get("/show", filter.showAll);
// Get all user information
router.get("/showall", filter.findAll);
// Get a users by userId
router.get("/user", filter.findUser);
// Get a list of the users by keywords
router.get("/search", filter.findUserByKeyword);



module.exports = router;