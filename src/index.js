require("dotenv").config();
const debug = require("debug")("perfectReadsBACK:root");
const serverUp = require("./server/startServer");
const app = require("./server");
const connectMongo = require("./db");

const port = process.env.PORT || 2020;
const mongoDB = process.env.MONGODB_URI;

(async () => {
  try {
    await serverUp(app, port);
    await connectMongo(mongoDB);
  } catch (error) {
    debug(
      error.code === "EADDRINUSE" ? "ERROR:port busy" : "error raising server"
    );
  }
})();
