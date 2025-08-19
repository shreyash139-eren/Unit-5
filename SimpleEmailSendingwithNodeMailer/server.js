const express=require("express")
const app=express()
const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});


app.get("/sendemail",async(req,res)=>{
    const info = await transporter.sendMail({
        from: '"Kumar Shreyash" <shreyash@gmail.com>',
        to: "shreyash.sinha35@gmail.com, shreyash.sinha34@gmail.com",
        subject: "Testing NodeMailer",
        text: "This is a testing Mail sent by NEM student, no need to reply.",
        // html: "<b>Hello world?</b>",
      });
      res.status(200).json({message:"Email sent"})
})



app.use((req,res)=>{
    res.status(404).json({message:"Invalid Route"})
})

app.listen(3000,()=>{
    console.log("Server Running")
})