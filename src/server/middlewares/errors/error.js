const debug = require("debug")("perfectReadsBACK:middlewares:errors");

const notFoundError = (req, res) => {
  res.status(404);
  res.json({ error: "Not found" });
};

// eslint-disable-next-line no-unused-vars
const fatalError = (err, req, res, next) => {
  debug(`fatal error`);
  const errorStatus = err.code ?? 500;
  const errorMessage = err.message ?? "Unknown error";
  res.status(errorStatus).json({ error: true, message: errorMessage });
};

module.exports = {
  notFoundError,
  fatalError,
};
