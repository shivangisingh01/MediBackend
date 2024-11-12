
// Middleware function to check if the user's role is authorized
function authorizeRole(allowedRoles) {
    return (req, res, next) => {
        // Assuming req.user is set by the JWT middleware and contains user information
        const userRole = req.user.role;

        if (allowedRoles.includes(userRole)) {
            next(); // User has the required role, proceed to the route handler
        } else {
            res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }
    };
}

module.exports = authorizeRole;
