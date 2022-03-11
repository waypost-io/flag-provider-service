const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const getFlags = require("./lib/getFlags.js");

const app = express();
const PORT = 5050;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/flags", routes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.code || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Somehow make a call to the ff manager and save the flags
  // const flags =
  // const flags = getFlags();
});
