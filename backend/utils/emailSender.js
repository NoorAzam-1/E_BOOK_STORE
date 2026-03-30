// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: 587,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendEmail = async (to, subject, html) => {
//   const mailOptions = {
//     from: `"Ebook Store" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   };

//   await transporter.sendMail(mailOptions);
// };

import { MailtrapClient } from "mailtrap";

const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sendEmail = async (to, subject, html) => {
  try {
    const response = await client.send({
      from: {
        email: process.env.MAILTRAP_SENDER_EMAIL,
        name: "Ebook Store",
      },
      to: [{ email: to }],
      subject: subject,
      html: html,
      category: "Ebook Store",
    });

    return response;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};