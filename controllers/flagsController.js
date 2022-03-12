/*
TODO: Validate that the POST request is from the FF manager
TODO: Add persistant flag data.


*/

module.exports = {
  async replaceFlags(req, res, next) {
    try {
      // save flags
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send("Error saving flags");
    }
  },
};
