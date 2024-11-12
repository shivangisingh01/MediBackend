
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
  ? req.headers.authorization.split(' ')[1]
  : null;

  console.log("Authorization Header:", req.headers.authorization);

  try {
    const decoded = verify(token, process.env.JWT_SECRET); 
    // Verify token with your JWT secret
    req.userId = decoded.userId; 
    // Add the user ID to the request object
    console.log("Decoded Token:", decoded);
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;



