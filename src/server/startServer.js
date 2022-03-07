const debug = require("debug")("tuita:root:");

const serverUp = (app, port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`server up at http://localhost:${port}`);
      resolve();
    });
    server.on("error", (error) => {
      reject(error);
    });
  });

module.exports = serverUp;
