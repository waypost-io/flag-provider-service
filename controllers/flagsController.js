const { get } = require("express/lib/request");
const { type } = require("express/lib/response");
const { setFlags, returnFlags } = require("../lib/flags.js");

/*
TODO: Validate that the POST request is from the FF manager
TODO: Add persistant flag data.


*/

async function replaceFlags(req, res, next) {
  try {
    setFlags(req.body);
    res.status(200);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving flags");
  }
}

async function getFlags(req, res, next) {
  try {
    res.status(200).send(returnFlags());
    next();
  } catch (err) {
    res.status(500).send("Error getting flags");
  }
}

module.exports.replaceFlags = replaceFlags;
module.exports.getFlags = getFlags;
