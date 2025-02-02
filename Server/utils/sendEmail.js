const nodemailer = require('nodemailer');
require('dotenv').config();

const otpStore = new Map(); 

// Generic email sending function
const sendEmail = async ({ email, subject, message }) => {
  console.log('Attempting to send email to:', email);
  console.log('Using email credentials:', {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD ? '****' : 'missing'
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: { name: 'CSIT Counselling System', address: process.env.EMAIL_USER },
    to: email,
    subject: subject,
    text: message,
  };

  try {
    console.log('Sending email with options:', {
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// OTP specific functions
const sendOTP = async (email) => {
  const OTP = Math.floor(Math.random() * 9000) + 1000;
  
  await sendEmail({
    email,
    subject: 'OTP Verification',
    message: `Your OTP is: ${OTP}. It will expire in 5 minutes.`
  });

  otpStore.set(email, { 
    otp: OTP, 
    expires: Date.now() + 5 * 60 * 1000 
  });

  return OTP;
};

const verifyOTP = async (email, OTP) => {
  const otpDetails = otpStore.get(email);

  if (!otpDetails || otpDetails.expires < Date.now()) {
    otpStore.delete(email);
    return false;
  }

  if (otpDetails.otp === parseInt(OTP, 10)) {
    otpStore.delete(email);
    return true;
  }

  return false;
};

module.exports = { sendEmail, sendOTP, verifyOTP };
