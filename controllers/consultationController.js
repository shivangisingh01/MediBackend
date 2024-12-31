const Consultation = require('../models/Consultation');

exports.makeConsultation = async (req, res) => {
    try {
      const { userId, doctorId } = req.params;
  
      if (!userId || !doctorId) {
        return res.status(400).json({ message: "userId and doctorId are required." });
      }
  
      // Save the doctor-patient pair to the database
      const newConsultation = new Consultation({ userId, doctorId });
      await newConsultation.save();
  
      res.status(201).json({ message: "Consultation tracked successfully." });
    } catch (error) {
      console.error("Error tracking consultation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  exports.checkConsultation = async (req, res) => {
    try {
      const { userId, doctorId } = req.params;
  
      if (!userId || !doctorId) {
        return res.status(400).json({ message: "userId and doctorId are required." });
      }
  
      // Check if doctor-patient pair exists
      const consultation = await Consultation.findOne({ userId, doctorId });
  
      res.json({ isFirstConsultation: !consultation });
    } catch (error) {
      console.error("Error checking consultation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }