const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true }, // e.g., "Delivery", "E-commerce"
});

module.exports = mongoose.model('Platform', platformSchema);
