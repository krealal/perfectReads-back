const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { notFoundError, fatalError } = require("./middlewares/errors/error");

const app = express();

app.use(morgan("dev"));
app.use(helmet());

app.use(notFoundError);
app.use(fatalError);

module.exports = app;
