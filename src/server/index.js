const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { notFoundError, fatalError } = require("./middlewares/errors/error");
const commentRouter = require("./routes/commentsRouter");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/reviews", commentRouter);

app.use(notFoundError);
app.use(fatalError);

module.exports = app;
