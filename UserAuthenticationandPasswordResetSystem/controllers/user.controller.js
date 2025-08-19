const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const salt = 10;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({ message: "Please try again later" });
        } else {
          await UserModel.create({ name, email, password: hash });
          return res.status(200).json({ message: "Signup Success" });
        }
      });
    } else {
      res.status(400).json({ message: "User exists, please login" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found, please signup" });
    }
    let hash = user.password;
    bcrypt.compare(password, hash).then(function (result) {
      if (result === true) {
        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({ message: "Login success", token });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found, please signup" });
    } else {
      let resetToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY,{expiresIn:60*5});
      let resetLink = `http://localhost/3000/resetpassword?token=${resetToken}`;
      await transporter.sendMail({
        from: '"shreyash" <shreyash@gmail.com>',
        to: user.email,
        subject: "Password reset link",
        html: `<p>Dear user ${user.name},here is the password reset link, please reset your password within 5 minutes</p>
                        <h4>${resetLink}</h4>`,
      });
      res
        .status(200)
        .json({ message: "Reset link sent to your registered email" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports = { signup, login, forgotPassword };
