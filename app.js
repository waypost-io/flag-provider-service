const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { fetchFlags } = require("./lib/flags.js");

const app = express();
const PORT = 5050;

// const flags = getFlags();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get the flags on initial boot
fetchFlags();

// routes
app.use("/", routes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.code || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
