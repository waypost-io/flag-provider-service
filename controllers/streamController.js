const { returnFlags } = require("../lib/flags");

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
  // console.log(res.getHeaders());
  // res.send(getFlags());
  // return;

  res.writeHead(200, headers);

  const data = `data: ${JSON.stringify(returnFlags())}\n\n`; // flags

  res.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
};

const sendUpdate = (req, res, next) => {
  console.log("New data sent to client");
  const data = `data: ${JSON.stringify(getFlags())}\n\n`;
  clients.forEach(({ res }) => res.write(data));
};

// What does the client do with this info?
const status = (req, res) => res.json({ clients: clients.length });

exports.handleNewConnection = handleNewConnection;
exports.sendUpdate = sendUpdate;
exports.status = status;
