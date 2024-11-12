const express = require('express');
const { registerUser ,  loginUser} = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken'); // Adjust the path if necessary
const authorizeRole = require('../middleware/roleCheck');
const router = express.Router();

// router.get('/logout', logoutUser);

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/fetch-login-data',getLoggedInUser );



// Example of a protected route
// router.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });


// Route accessible only by admin users
// router.get('/admin/dashboard', authenticateToken, authorizeRole(['admin']), (req, res) => {
//     res.send('Welcome to the Admin Dashboard');
// });

// Route accessible by doctors and nurses
// router.get('/medical/records', authenticateToken, authorizeRole(['doctor', 'nurse']), (req, res) => {
//     res.send('Accessing medical records');
// });

module.exports = router;


