const { keyManager } = require("../lib/key");

async function replaceKey(req, res, next) {
  try {
    keyManager.setKey(req.body.key);
    res.status(200).send({ message: "Received" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Error sending key" });
  }
}

async function validateKey(req, res, next) {
  const requestKey = req.query.sdk_key;
  try {
    if (requestKey !== keyManager.getKey()) {
      res.status(403).send({
        message: "Invalid sdk key",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
}

module.exports.replaceKey = replaceKey;
module.exports.validateKey = validateKey;
