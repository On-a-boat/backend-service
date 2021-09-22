const express = require("express");
const filterController = require("../controllers/filterController");
const router = express.Router();

// allow admin to search a list of users by inputing age, keywords 
router.post("/", filterController.searchUsers);

// get a list of users with keywords 
router.get("/:keywords", filterController.getUsers);

// get information for a specific user by id 
router.get("/:name", filterController.getSingleUser);


module.exports = router;