const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');


// exports.logoutUser = (req, res) => {
//   try {
//     // If you're using JWT authentication, you can clear the token cookie
//     res.clearCookie('token', {
//       httpOnly: true,  // For security reasons, make the cookie HTTP-only
//       secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
//       sameSite: 'Strict',  // Add protection against CSRF attacks
//     });

//     res.status(200).json({ message: 'Successfully logged out' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error during logout', error: error.message });
//   }
// };


// exports.getLoggedInUser = async (req, res) => {
//   try {
//     // Extract user ID from the JWT token stored in the request
//     const token = req.headers.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     // Fetch the user from the database using the user ID from the token
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Respond with the user's data (excluding sensitive information like password)
//     const { password, ...userData } = user.toObject();
//     res.json(userData);
//   } catch (error) {
//     console.error('Error fetching user data:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// Controller function to handle user registration

// export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
//   const user = req.user;
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

exports.registerUser = async (req, res) => {
  const { firstName, lastName,email,phone,address ,dob, gender,password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({ firstName, lastName,email, phone, address ,dob, gender,password });
    console.log('New User Object:', newUser);

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log('Saved User Object:', savedUser);

    // Create a JWT token for the new user using savedUser._id and savedUser.dob
    const payload = { userId: savedUser._id, dob: savedUser.dob };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(201).json({ message: 'Registration successful', token });
  } catch (error) {
    console.error('Registration error:', error); // Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Log in an existing user 
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({status: 'success',
      user: {
        id: user._id,
        name: user.firstName,
        email: user.email,
      },
      message: 'Login successfull', 
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

