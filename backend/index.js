require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3001;
const url = process.env.MONGO_URL || "mongodb://localhost:27017/profitprofile";
const { HoldingsModel } = require("./models/holdings");
const { PosModel } = require("./models/positions");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/allholdings', async (req, res) => {
  let allholdings = await HoldingsModel.find({});
  res.json(allholdings);
});

app.get('/allpositions', async (req, res) => {
  let allpositions = await PosModel.find({});
  res.json(allpositions);
});

app.listen(port, () => {
  console.log("Server is running on port 3001");
  mongoose.connect(url);
  console.log("Connected to MongoDB");
});
