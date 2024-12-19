// In your backend routes (e.g., services.js)
const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Assuming you have a Service model

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find(); // Assuming you have a Service model with a 'name' field
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

module.exports = router;
