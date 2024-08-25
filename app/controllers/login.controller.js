const db = require('../models');
const config = require("../config/auth.config");
const Officer = db.officer;

var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");

exports.genkey = (req, res) => {
  const password = req.body.password; // เพิ่มบรรทัดนี้เพื่อกำหนดค่า password
  const hash = bcrypt.hashSync(password, 10);
  console.log(bcrypt.compareSync(password, hash)); // ควรจะ return true เสมอ
  res.status(200).json({ password: hash });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  Officer.findOne({ where: { username } })
    .then(user => {
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: "User not found" });
      }

      console.log('Stored password hash:', user.password);

      // ตรวจสอบความถูกต้องของรหัสผ่าน
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        console.log('Invalid password');
        return res.status(401).json({
          accessToken: null,
          message: "Invalid password"
        });
      }

      // สร้าง JWT token
      const token = jwt.sign({ id: user.officerId}, config.secret, {
        algorithm: "HS256",
        expiresIn: 3600 // 1 hour
      });
      console.log('JWT Token:', token);

      // ส่งข้อมูลกลับไปยังผู้ใช้
      res.status(200).json({
        id: user.officerId, // ใช้ `officerId` ตามที่ระบุในโมเดล
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch(err => {
      console.error(`Error occurred during login: ${err.message}`);
      res.status(500).json({ message: "Internal server error" });
    });
};


exports.updatePassword = (req, res) => {
  const username = req.body.username;
  const newPassword = req.body.newPassword;
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  Officer.update({ password: hashedPassword }, { where: { username: username } })
    .then(() => {
      res.status(200).json({ message: "Password updated successfully" });
    })
    .catch(err => {
      console.error(`Error occurred during password update: ${err.message}`);
      res.status(500).json({ message: err.message });
    });
};


