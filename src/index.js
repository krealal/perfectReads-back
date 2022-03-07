require("dotenv").config();
const debug = require("debug")("perfectReadsBACK:root");
const serverUp = require("./server/startServer");
const app = require("./server");

const port = process.env.PORT || 2020;

(async () => {
  try {
    await serverUp(app, port);
  } catch (error) {
    debug(
      error.code === "EADDRINUSE" ? "ERROR:port busy" : "error raising server"
    );
  }
})();
