const axios = require("axios");
require("dotenv").config();

let key = "";

async function fetchKey() {
  try {
    const response = await axios.get(
      `${process.env.FEATURE_FLAG_MANAGER_URL}/api/sdkKey`
    );
    key = response.data;
  } catch (err) {
    console.log("Could not get key from waypost server");
  }
}

function setKey(newKey) {
  key = newKey;
}

function returnKey() {
  return key;
}

module.exports.fetchKey = fetchKey;
module.exports.setKey = setKey;
module.exports.returnKey = returnKey;
