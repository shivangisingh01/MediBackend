const Doctor = require("../models/Doctor");

// Book an appointment
exports.addDoc = async (req, res) => {
  try {
    const { name, docImg, yearsOfexp, specialization} = req.body;

    // Create a new user instance
    const newDoctor = new Doctor({ name, docImg, yearsOfexp, specialization });

    console.log("New Doc Object:", newDoctor);

    await newDoctor.save();

    res.status(201).json({ message: "Added successfully!", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor", error });
  }
};
