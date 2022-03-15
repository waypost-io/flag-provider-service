const express = require("express");
const router = express.Router();

const { replaceFlags } = require("../controllers/flagsController");
const streamController = require("../controllers/streamController");

router.post("/flags", replaceFlags);

router.get("/stream", streamController.handleNewConnection);

router.get("/status", streamController.status);

module.exports = router;
