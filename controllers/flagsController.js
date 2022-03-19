const { get } = require("express/lib/request");
const { type } = require("express/lib/response");
const { setFlags, returnFlags } = require("../lib/flags.js");
let clients = [];
/*
TODO: validate that the new connection is from a valid client
*/
const handleNewConnection = async (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  console.log("user connected");

  res.writeHead(200, headers);

  const data = `data: ${JSON.stringify(returnFlags())}\n\n`; // flags

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  res.write(data);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
};

/*
TODO: Validate that the POST request is from the FF manager
TODO: Add persistant flag data.
*/

async function replaceFlags(req, res, next) {
  try {
    setFlags(req.body);
    const data = `data: ${JSON.stringify(returnFlags())}\n\n`;
    clients.forEach((client) => {
      client.res.write(data);
    });

    res.status(200).send("Received");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error saving flags");
  }
}

async function getFlags(req, res, next) {
  try {
    res.status(200).send(returnFlags());
  } catch (err) {
    res.status(500).send("Error getting flags");
  }
}

module.exports.replaceFlags = replaceFlags;
module.exports.getFlags = getFlags;
module.exports.handleNewConnection = handleNewConnection;