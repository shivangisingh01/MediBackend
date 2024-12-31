const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    doctorId: { type: Number, required: true},

    date: { type: String, required: true },

    timeSlot: { type: String, required: true }, // Example: "10:00 AM - 10:30 AM"

    // status: { type: String, default: "Scheduled" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
