const express = require("express");
const filter = require("../controllers/filterController");
const router = express.Router();

// allow admin to search a list of users by inputing age, keywords 
router.get("/", filter.findAll);

// get a list of users with keywords 
router.get("/user", filter.findUser);

router.get("/search", filter.findUserByKeyword);
// get information for a specific user by id 
//router.get("/:name", filterController.getSingleUser);


module.exports = router;