const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) {
        return res.status(500).json({ message: "Try again later" });
      }
      await UserModel.create({ name, email, password: hash, role });
      res.status(201).json({ message: "Signup success" });
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found, signup" });
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
        res
          .status(200)
          .json({ message: "Login success", accessToken, refreshToken });
      } else {
        return res.status(401).json({ message: "Wrong password" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again later" });
  }
};

module.exports={signup,login}