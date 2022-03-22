require("dotenv").config();

function validateWebhook(req, res, next) {
  const validateHeader = req.headers["webhook-validator"];

  if (process.env.WEBHOOK_VALIDATOR !== validateHeader) {
    res.status(403).send({
      message: "Invalid origin",
    });
  } else {
    next();
  }
}

module.exports.validateWebhook = validateWebhook;
