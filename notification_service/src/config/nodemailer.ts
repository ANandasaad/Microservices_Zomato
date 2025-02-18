import nodemailer from "nodemailer";
import config from ".";

export const transporter = nodemailer.createTransport({
  host: config.email_smtp_host,
  port: 587,
  secure: false,
  auth: {
    user: config.email_username,
    pass: config.email_password,
  },
});
