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

const jwt = require('jsonwebtoken');
const User = require('./models/User')
const routes = require('./routes/route');

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
app.use("/", routes);

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = await jwt.verify(accessToken, process.env.SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    } 
    res.locals.loggedInUser = await User.findById(userId); next(); 
    } else { 
    next(); 
    } 
});


app.use(middleware.unknownEndpoint); // handles unkown endpoints
app.use(middleware.errorHandler); // handles known errors

module.exports = app;