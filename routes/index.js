const express = require("express");
const router = express.Router();

const flagsController = require("../controllers/flagsController");
const streamController = require("../controllers/streamController");
const keyController = require("../controllers/keyController");

router.post("/key", keyController.replaceKey);

router.post("/flags", flagsController.replaceFlags);

router.get("/flags", keyController.validateKey, flagsController.getFlags);

router.get(
  "/stream",
  keyController.validateKey,
  streamController.handleNewConnection
);

module.exports = router;
