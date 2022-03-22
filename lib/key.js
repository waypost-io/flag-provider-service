const axios = require("axios");
require("dotenv").config();

class keyManager {
  constructor() {
    this._key = "";
  }

  async fetchKey() {
    try {
      const response = await axios.get(
        `${process.env.FEATURE_FLAG_MANAGER_URL}/api/sdkKey`
      );
      this._key = response.data;
    } catch (err) {
      console.log("Could not get key from waypost server");
    }
  }

  setKey(newKey) {
    this._key = newKey;
  }

  getKey() {
    return this._key;
  }
}

module.exports.keyManager = new keyManager();

// let key = "";

// async function fetchKey() {
//   try {
//     const response = await axios.get(
//       `${process.env.FEATURE_FLAG_MANAGER_URL}/api/sdkKey`
//     );
//     key = response.data;
//   } catch (err) {
//     console.log("Could not get key from waypost server");
//   }
// }

// function setKey(newKey) {
//   key = newKey;
// }

// function returnKey() {
//   return key;
// }

// module.exports.fetchKey = fetchKey;
// module.exports.setKey = setKey;
// module.exports.returnKey = returnKey;
