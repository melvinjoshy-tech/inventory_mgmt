const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/signup', async (req, res) => {
  const { userName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ msg: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userName, email, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user: { id: user._id, userName: user.userName, email: user.email } });
});

// Login
router.post('/login', async (req, res) => {
  console.log("Login request body:", req.body); // 🕵️
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found");
    return res.status(400).json({ msg: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Invalid password");
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user: { id: user._id, userName: user.userName, email: user.email } });
});


// Protected Route Example
router.get('/dashboard', auth, async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  res.json(user);
});

module.exports = router;
