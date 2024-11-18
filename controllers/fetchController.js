const User = require('../models/User'); // Your User model

// Controller function to get the logged-in user's data
exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // The user id comes from the token after authentication
    const user = await User.findById(userId).select('-password'); // Exclude password from the result

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Send user data back to the client
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
