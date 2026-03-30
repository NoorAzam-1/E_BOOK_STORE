// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: process.env.EMAIL_PORT == 465,
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


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",   // ✅ FINAL FIX
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Ebook Store" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};