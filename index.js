const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(morgan("dev"));

module.exports = app;
