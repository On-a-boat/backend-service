const express = require("express");
const filterController = require("../controllers/filterController");
const router = express.Router();

router.post("/", filterController.searchUsers);

router.get("/:keywords", filterController.getUsers);

router.get("/:name", filterController.getUser);


module.exports = router;