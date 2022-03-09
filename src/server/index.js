const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { notFoundError, fatalError } = require("./middlewares/errors/error");
const router = require("./routes/commentsRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/reviews", router);

app.use(notFoundError);
app.use(fatalError);

module.exports = app;
