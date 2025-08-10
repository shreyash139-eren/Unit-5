const express = require("express");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const salt = 10;

UserRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) {
        return res.status(500).json({ message: "Try again later" });
      } else {
        await UserModel.create({ name, email, password: hash });
        res.status(201).json({ message: "Signup success" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    let hash = user.password;
    bcrypt.compare(password, hash).then(function (result) {
      if (result === true) {
        var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ message: "login success", token });
      } else {
        return res.status(401).json({ message: "Wrong password" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = UserRouter;
