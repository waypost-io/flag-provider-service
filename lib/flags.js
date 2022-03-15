const axios = require("axios");
require("dotenv").config();

let flags = [];

async function fetchFlags() {
  try {
    const flags = await axios.get(process.env.FEATURE_FLAG_MANAGER_URL);
  } catch (err) {
    // maybe start polling if the request doesn't work?
    console.log(err, "Could not get flags.");
  }
}

function setFlags(newFlags) {
  flags = [...newFlags];
}

function getFlags() {
  return flags;
}

module.exports.fetchFlags = fetchFlags;
module.exports.setFlags = setFlags;
module.exports.getFlags = getFlags;
