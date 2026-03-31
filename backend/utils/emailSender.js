import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Ebook Store" <no-reply@ebook.com>',
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log("Email error:", error);
  }
};