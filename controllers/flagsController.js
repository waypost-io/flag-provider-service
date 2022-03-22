const { flagManager } = require("../lib/flags.js");
const { sendToClients } = require("./streamController");

async function replaceFlags(req, res, next) {
  try {
    flagManager.setFlags(req.body);
    sendToClients();
    res.status(200).send({ message: "Received" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Error saving flags" });
  }
}

async function getFlags(req, res, next) {
  try {
    res.status(200).send(flagManager.getFlags());
  } catch (err) {
    res.status(500).send({ message: "Error getting flags" });
  }
}

module.exports.replaceFlags = replaceFlags;
module.exports.getFlags = getFlags;
