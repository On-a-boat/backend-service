const express = require("express");
const statistics = require("../controllers/statisticController");
const router = express.Router();

// Get all openEmail
router.get("/allopen", statistics.allOpenEmail);

// count all user
router.get("/allUser",statistics.countAllUser);

// count Gender
router.get("/allGender", statistics.allGender);

module.exports = router;