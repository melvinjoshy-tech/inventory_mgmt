const express = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Product
router.post('/', auth, async (req, res) => {
  const { productId, name, quantity, price } = req.body;

  const existing = await Product.findOne({ productId });
  if (existing) return res.status(400).json({ msg: 'Product already exists' });

  const product = await Product.create({ productId, name, quantity, price });
  res.status(201).json({ msg: 'Product created', product });
});

// Get All Products
router.get('/', auth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Optional: Get Single Product, Update Product, Delete Product

module.exports = router;
