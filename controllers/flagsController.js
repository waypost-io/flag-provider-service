const { get } = require("express/lib/request");
const { type } = require("express/lib/response");
const { setFlags, returnFlags } = require("../lib/flags.js");
const { clients } = require('./streamController');
/*
TODO: Validate that the POST request is from the FF manager
TODO: Add persistant flag data.


*/

async function replaceFlags(req, res, next) {
  try {
    console.log("received");
    setFlags(req.body);
    // Moved from streamController sendUpdate()
    console.log("New data sent to client");
    console.log(returnFlags());
    const data = `data: ${JSON.stringify(returnFlags())}\n\n`;
    clients.forEach(({ res }) => {
      res.write(data);
    });
    res.status(200).send("Received");
    // next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error saving flags");
  }
}

async function getFlags(req, res, next) {
  try {
    res.status(200).send(returnFlags());
  } catch (err) {
    res.status(500).send("Error getting flags");
  }
}

module.exports.replaceFlags = replaceFlags;
module.exports.getFlags = getFlags;
