const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    
    if (!token) {
        console.log('No token provided');
        return res.status(403).json({ message: "No token provided" });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(401).json({ message: "Unauthorized! Token may be expired or invalid" });
        }
        
        req.user = { id: decoded.id, accessUser: decoded.accessUser }; // Ensure the user ID is set in req.user
        console.log('Token verified. User:', req.user);
        next();
    });
};

module.exports = { verifyToken };
