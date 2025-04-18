const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

const sendMail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: '"Autohaus" <noreply@autohaus.ink>',
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;