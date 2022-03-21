const express = require("express");
const router = express.Router();

const flagsController = require("../controllers/flagsController");
const streamController = require("../controllers/streamController");

router.post("/flags", flagsController.replaceFlags);

router.get("/flags", flagsController.getFlags);

router.get("/stream", streamController.handleNewConnection);

module.exports = router;
