const Feedback = require('../models/Feedback');

// POST route to submit feedback
exports.submitFeedback =  async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // if (!message) {
  //   return res.status(400).json({ message: 'Feedback message is required' });
  // }

  try {
    const newFeedback = new Feedback({ firstName, lastName, email, phone, message });
    const savedFeedback = await newFeedback.save();
    res.status(201).json({ message: 'Feedback received', feedback: savedFeedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

