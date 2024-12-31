const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  doctorId: {
    type: Number,
    // ref: 'Doctor', // Assuming you have a Doctor model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Any other fields you may need, like consultation notes, status, etc.
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;
