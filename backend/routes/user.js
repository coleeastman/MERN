const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//controller functions
const { signupUser, loginUser} = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)


router.post('/send-verification-email', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.sendemail(email, password);
  
      res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  router.post('/verify-code', async (req, res) => {
    const { email, verificationCode } = req.body;
  
    console.log(`Received verification request for email: ${email} with code: ${verificationCode}`);
  
    try {
      const user = await User.findOne({ email, verificationCode });
  
      if (!user) {
        console.log('No user found with the provided email and verification code.');
        return res.status(400).json({ error: 'Invalid verification code' });
      }
  
      if (user.verificationCodeExpires < Date.now()) {
        console.log('Verification code has expired.');
        return res.status(400).json({ error: 'Verification code expired' });
      }
  
      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();
  
      // Generate a token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '3d' });
  
      res.status(200).json({ email: user.email, token });
    } catch (error) {
      console.error('Error during verification:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  module.exports = router;