import nodemailer from "nodemailer";
import { renderToStaticMarkup } from "react-dom/server";
import Emailer from "../../constant/Emailer"; // assuming the template is in a separate file

const dotenv = require("dotenv");
dotenv.config();

export default async function handler(req, res) {
  try {
    if(req.method !== "POST") {
      res.status(400).json({message: "Bad Request. check Method"})
    }
    if(!req.body.email || !req.body.name) {
      res.status(401).json({message: "Detail is missing"})
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "yoho4613@gmail.com",
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "trademe-manager-nz@gmail.com",
      to: `${req.body.email}`,
      subject: `Welcome to TradeMe-Manger ${req.body.name}!`,
      html: renderToStaticMarkup(<Emailer name={req.body.name} />),
    });

    console.log("Message sent: %s", info.messageId);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
}
