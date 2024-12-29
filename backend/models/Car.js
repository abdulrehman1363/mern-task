const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  color: { type: String, required: true },
  model: { type: String, required: true },
  make: { type: String, required: true },
  registrationNo: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Car', carSchema);
