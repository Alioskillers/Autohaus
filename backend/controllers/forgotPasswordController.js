const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/mailer');
const dotenv = require('dotenv');
dotenv.config();

let otpStore = {};

const verifyResetDetails = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const user = await User.findOne({ email, phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    await sendMail({
      to: email,
      subject: 'Autohaus Account OTP Verification',
      html: `
        <div style="font-family:Arial, sans-serif; padding:20px;">
          <h2>Hello from Autohaus</h2>
          <p>Your OTP code to reset your password is:</p>
          <h3 style="color:#333;">${otp}</h3>
          <p>This code will expire shortly. If you didn’t request this, please ignore this email.</p>
          <br/>
          <p style="color:#888;">— Autohaus Security Team</p>
        </div>
      `
    });

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const validOtp = otpStore[email];

  if (!validOtp || parseInt(otp) !== parseInt(validOtp)) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  delete otpStore[email];
  const user = await User.findOne({ email });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

  res.status(200).json({ message: 'OTP verified', token });
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  verifyResetDetails,
  resetPassword,
  verifyOtp,
};