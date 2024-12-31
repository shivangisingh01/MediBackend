
const Appointment = require('../models/Appointment');

// Book an appointment
exports.createAppointment = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { userId, doctorId, date, timeSlot } = req.body;
    console.log("User ID:", userId); 

    // Check if the slot is already taken
    const existingAppointment = await Appointment.findOne({
      user: userId,
      doctorId: doctorId,
      date,
      timeSlot,
    });

    if (existingAppointment) {
      console.log('Time slot already booked');
      return res.status(400).json({ message: 'Time slot already booked!' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      user: userId,
      doctorId: doctorId,
      date,
      timeSlot,
    });

    await newAppointment.save();
    console.log("Appointment booked successfully:", newAppointment);
    res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};


