import nodemailer from "nodemailer";
import "dotenv/config";

const config = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const payload = {
  from: process.env.SMTP_USER,
  to: "seliverstova.valerya@gmail.com",
  subject: "Nodemailer test",
  text: "Привіт. Ми тестуємо надсилання листів!",
};

const sendEmail = (payload) => {
  const email = { ...payload, from: process.env.SMTP_USER };
  return transporter.sendMail(email);
};

export default sendEmail;

// transporter
//   .sendMail(payload)
//   .then((info) => console.log(info))
//   .catch((err) => console.log(err));
