const express = require("express");
const router = express.Router();

const flagsController = require("../controllers/flagsController");

router.post("/flags", flagsController.replaceFlags);

router.get("/flags", flagsController.getFlags);

router.get("/stream", flagsController.handleNewConnection);

module.exports = router;
