const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const salt = 10;

const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res
            .status(500)
            .json({ message: "Something went wrong, try again later" });
        } else {
          await UserModel.create({ username, email, password: hash, role });
          return res.status(201).json({ message: "Signup suceess" });
        }
      });
    } else {
      res.status(409).json({ message: "Account already exists, please login" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found, please signup" });
    }
    let hash = user.password;
    bcrypt.compare(password, hash).then(function (result) {
      if (result === true) {
        let accessToken = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 60 * 15 }
        );
        let refreshToken = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 60 * 60 * 24 * 7 }
        );
        return res
          .status(200)
          .json({ message: "Login success", accessToken, refreshToken });
      } else {
        res.status(401).json({ message: "Wrong Password" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports = { signup, login };
