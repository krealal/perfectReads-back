const debug = require("debug")("perfectReadsBACK:database");
const mongoose = require("mongoose");

const connectMongo = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      if (error) {
        reject(error);
        return;
      }
      debug(`Database connected`);
      resolve();
    });
  });
module.exports = connectMongo;
