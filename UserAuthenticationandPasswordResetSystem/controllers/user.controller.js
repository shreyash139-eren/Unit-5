const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer")
const salt = 10;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});
  

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
        process.env.JWT_SECRET_KEY,{expiresIn:60*15});
      let resetLink = `http://localhost:3000/resetpassword?token=${resetToken}`;
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

const resetPassword=async(req,res)=>{
    try {
        const {token}=req.query
        const {newPassword}=req.body
        let decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(decoded){
            let user=await UserModel.findById(decoded.userId)
            bcrypt.hash(newPassword,salt,async function(err,hash){
                if(err){
                    return res.status(500).json({message:"Something went wrong"})
                }else{
                    user.password=hash
                    await user.save()
                    res.status(200).json({message:"Pasword changed"})
                }
            })
        }
    } catch (error) {
        if(error.message==="jwt expired"){
            res.status(403).json({message:"Token expired"})
        }else{
            res.status(500).json({message:"Something went wrong"})
        }
    }
}

module.exports = { signup, login, forgotPassword, resetPassword};
