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
