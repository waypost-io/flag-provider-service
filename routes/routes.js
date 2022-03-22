const express = require("express");
const router = express.Router();

const flagsController = require("../controllers/flagsController");
const streamController = require("../controllers/streamController");
const keyController = require("../controllers/keyController");
const { validateWebhook } = require("../lib/validateWebhook");

router.post("/key", validateWebhook, keyController.replaceKey);

router.post("/flags", validateWebhook, flagsController.replaceFlags);

router.get("/flags", keyController.validateKey, flagsController.getFlags);

router.get(
  "/stream",
  keyController.validateKey,
  streamController.handleNewConnection
);

module.exports = router;
