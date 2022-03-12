/*
TODO: validate that the new connection is from a valid client
TODO: Add persistant flag data

*/

const handleNewConnection = async (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  res.writeHead(200, headers);

  const data = `data: ${JSON.stringify(flags)}\n\n`; // flags

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
  const updatedFlags = updateFlags(req, [...flags]);

  if (updatedFlags) {
    flags = updatedFlags;
    const data = `data: ${JSON.stringify(flags)}\n\n`;
    clients.forEach(({ res }) => res.write(data));
  }
};

const updateFlags = (req, flags) => {
  if (req.newFlag) {
    flags.push(req.newFlag);
  } else if (req.deletedFlagId) {
    flags = flags.filter((flag) => flag.id !== req.deletedFlagId);
  } else if (req.updatedFlag) {
    flags = flags.map((flag) => {
      return flag.id === req.updatedFlag.id ? req.updatedFlag : flag;
    });
  } else {
    return undefined;
  }
  return flags;
};

const status = (req, res) => res.json({ clients: clients.length });

exports.handleNewConnection = handleNewConnection;
exports.sendUpdate = sendUpdate;
exports.status = status;
