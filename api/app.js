const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require('fs')
const path = require('path')

const settings = require('./settings')

const api = express();

mongoose.connect(settings.MONGO_URL);

api.use(morgan("dev"));
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
	require('./routes/' + file)(api);
});

api.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

api.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = api;