require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const port = process.env.PORT || 3001;
const url = process.env.MONGO_URL || "mongodb://localhost:27017/profitprofile";
const { HoldingsModel } = require("./models/holdings");
const { PosModel } = require("./models/positions");
const { OrdersModel } = require("./models/orders");
const { UserModel } = require("./models/users");
const otpStore = {};

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: "Secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.get("/allholdings", async (req, res) => {
  let allholdings = await HoldingsModel.find({});
  res.json(allholdings);
});

app.get("/allpositions", async (req, res) => {
  let allpositions = await PosModel.find({});
  res.json(allpositions);
});

app.post("/neworder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  await newOrder.save();
});

function generateOTP(){
  return Math.floor(100000+Math.random()*900000).toString();
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-otp', async(req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const expiresAt = Date.now() + 5*60*1000;

  otpStore[email] = {otp, expiresAt};

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subjct: "Your OTP Code from ProfitProfile",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`
  };

  try{
    await transporter.sendMail(mailOptions);
    res.status(200).json({message: "OTP sent"});
  } catch(err) {
    res.status(500).json({ error: "Failed to send OTP"});
  }
});

app.post("/verify-otp", (req, res) => {
  const {email, otp} = req.body;
  const record = otpStore[email];

  if(!record) return res.status(400).json({error: "No OTP requested for this account."});

  if(Date.now() > record.expiresAt) return res.status(400).json({error: "OTP expired"});

  if(otp != record.otp) return res.status(400).json({error: "Incorrect OTP"});

  delete otpStore[email];
  res.status(200).json({message: "OTP verified"});
});

app.listen(port, () => {
  console.log("Server is running on port 3001");
  mongoose.connect(url);
  console.log("Connected to MongoDB");
});
