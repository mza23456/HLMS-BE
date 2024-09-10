const db = require('../models');
const config = require("../config/auth.config");
const Officer = db.officer;
const Access = db.access;


var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");

exports.genkey = (req, res) => {
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, 10); 
  console.log("Hash:", hash); // เข้ารหัสรหัสผ่านด้วย bcrypt
  console.log(bcrypt.compareSync(password, hash)); // ควรจะ return true
  res.status(200).json({ password: hash });  // ส่งแฮชกลับไปใน response
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Find officer and include the related access data
  Officer.findOne({
    where: { username },
    include: [{
      model: Access, // Ensure the association is set correctly
      as: 'access', // Use the correct alias from the association
      attributes: ['access_name'] // Fetch only the 'access_name' column
    }]
  })
  .then(user => {
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Input password:", password);
    console.log("Stored hash:", user.password);
    console.log("Password match:", bcrypt.compareSync(password, user.password));

    // Verify password
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      console.log('Invalid password');
      return res.status(401).json({
        accessToken: null,
        message: "Invalid password"
      });
    }

    // Check if the access_name exists in the access model
    const accessName = user.access ? user.access.access_name : null;

    if (!accessName) {
      console.log('Access name not found');
      return res.status(401).json({
        accessToken: null,
        message: "Access name not found for this user"
      });
    }

    // Create JWT token with officer ID and access_name
    const token = jwt.sign({
      id: user.officerId,
      accessUser: accessName // Use access_name as the role
    }, config.secret, {
      algorithm: "HS256",
      expiresIn: 3600 // 1 hour
    });

    console.log('JWT Token:', token);
    const decoded = jwt.verify(token, config.secret);
    console.log("Decoding---",decoded);
    // Send response with token
    res.status(200).json({
      id: user.officerId, // officerId from Officer model
      username: user.username,
      email: user.email,
      accessUser: accessName, // Return access_name as role
      accessToken: token,
    });
  })
  .catch(err => {
    console.error(`Error occurred during login: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
  });
};

// Logout
const blacklistedTokens = new Set();
exports.logout = (req, res) => {
  const token = req.headers["x-access-token"];

  if (token) {
    blacklistedTokens.add(token);
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};

// Middleware เพื่อตรวจสอบ Token ที่ถูกยกเลิก
exports.isTokenBlacklisted = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  next();
};