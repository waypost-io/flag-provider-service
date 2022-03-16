const { type } = require("express/lib/response");
const { setFlags } = require("../lib/flags.js");

/*
TODO: Validate that the POST request is from the FF manager
TODO: Add persistant flag data.


*/

async function replaceFlags(req, res, next) {
  try {
    setFlags(req.body);
    res.status(200).send("Flags saved");
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving flags");
  }
}

module.exports.replaceFlags = replaceFlags;
