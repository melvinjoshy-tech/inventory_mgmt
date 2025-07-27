// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const router = express.Router();

// // Signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: 'User already exists' });

//     const hash = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ name, email, password: hash });
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: '1h' });

//     res.json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: '1h' });

//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// // Middleware to protect routes
// const auth = (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (!token) return res.status(401).json({ msg: 'No token, access denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
//     req.user = decoded.id;
//     next();
//   } catch {
//     res.status(400).json({ msg: 'Token is not valid' });
//   }
// };

// // Protected route example
// router.get('/dashboard', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user).select('-password');
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// module.exports = router;
