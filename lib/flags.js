const axios = require("axios");
require("dotenv").config();

let flags = [];

async function fetchFlags() {
  try {
    const response = await axios.get(process.env.FEATURE_FLAG_MANAGER_URL);
    flags = response.data;
  } catch (err) {
    console.log("Could not get flags from waypost server");
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
