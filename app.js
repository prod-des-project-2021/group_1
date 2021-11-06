const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

const itemsRoute = require("./controllers/items");
const ratesRoute = require("./controllers/rates");
const authRoute = require("./controllers/auth");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static("docs"));


app.get("/", (req, res) => {
  res.send("Hello World API!");
});

app.use("/items", itemsRoute);
app.use("/rates", ratesRoute);
app.use("/auth", authRoute);


app.use(middleware.unknownEndpoint); // handles unkown endpoints
app.use(middleware.errorHandler); // handles known errors

module.exports = app;