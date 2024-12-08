const express = require('express');
const Order = require('../models/Order');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      items,
      address,
      paymentDetails, // This should contain paymentMethod, phoneNumber, lastFourDigits, paymentReference
      subtotal,
      shipping,
      tax,
      total
    } = req.body;

    // Validate payment details for COD or Online
    if (paymentDetails.paymentMethod === 'COD' && !paymentDetails.phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required for COD payment.' });
    }

    if (paymentDetails.paymentMethod === 'Online' && !paymentDetails.paymentReference) {
      return res.status(400).json({ message: 'Payment reference is required for Online payment.' });
    }

    const newOrder = new Order({
      user: req.session.userId,
      items,
      address,
      paymentDetails,
      subtotal,
      shipping,
      tax,
      total
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all orders for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ message: 'Could not fetch orders' });
  }
});

// Get a specific order by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).where({ user: req.session.userId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error('Fetch order error:', error);
    res.status(500).json({ message: 'Could not fetch order' });
  }
});

module.exports = router;
