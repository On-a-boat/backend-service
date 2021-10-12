const express = require("express");
const statistics = require("../controllers/statisticController");
const router = express.Router();

// Get all openEmail
router.get("/allOpen", statistics.allOpenEmail);

// count all user
router.get("/allUser",statistics.countAllUser);

// count Gender
router.get("/allGender", statistics.allGender);

// Get allAge
router.get("/allAge", statistics.allAge);

// find opened Email for one Email
router.get("/email", statistics.findEmail);

// find content for one Email
router.get("/content", statistics.findContent);

// find content for one Email
router.get("/sent", statistics.findSent);

// return NewUsers for today 
router.get("/newUser", statistics.newUser);

module.exports = router;