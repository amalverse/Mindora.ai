const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    moodType: {
      type: String,
      enum: ['Happy', 'Calm', 'Productive', 'Sad', 'Anxious', 'Angry'],
      required: [true, 'Please add a mood type'],
    },
    note: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Mood', moodSchema);
