const express = require('express');
const router = express.Router();
const Platform = require('../models/Platform');

// Get all platforms for a specific service
router.get('/', async (req, res) => {
  const { service } = req.query;

  if (!service) {
    return res.status(400).json({ error: 'Service query parameter is required' });
  }

  try {
    const platforms = await Platform.find({ service });
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch platforms' });
  }
});

// Add a new platform (optional for testing)
router.post('/', async (req, res) => {
  const { name, service } = req.body;

  if (!name || !service) {
    return res.status(400).json({ error: 'Name and service are required' });
  }

  try {
    const newPlatform = new Platform({ name, service });
    await newPlatform.save();
    res.status(201).json(newPlatform);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create platform' });
  }
});

module.exports = router;
