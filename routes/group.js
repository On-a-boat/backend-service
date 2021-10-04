const express = require("express");
const group = require("../controllers/groupController");
const router = express.Router();

router.get("/", group.getGroup);


//router.post("/group", group.postGroup);






module.exports = router;