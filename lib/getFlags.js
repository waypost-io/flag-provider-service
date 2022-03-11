const axios = require("axios");

module.exports = {
  async getFlags() {
    try {
      const flags = await axios.get("ffurl");

      return flags;
    } catch (err) {
      console.log(err, "Could not get flags.");
    }
  },
};
