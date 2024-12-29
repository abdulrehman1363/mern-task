const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false, // Unique per user, not globally
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1, user: 1 }, { unique: true }); // Enforce unique name per user

module.exports = mongoose.model('Category', categorySchema);
