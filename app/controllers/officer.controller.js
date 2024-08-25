const db = require("../models");
const multer = require('multer')
const Officer = db.officer;
const Area = db.area
const Access = db.access

exports.findAllOfficers = async (req, res) => {
    try {
        // ดึงข้อมูล Officer ทั้งหมดจากฐานข้อมูล
        const officers = await Officer.findAll({
            attributes: [
                'officerId',
                'accessRights',
                'areaId',
                'code',
                'firstName',
                'lastName',
                'email',
                'phone',
                'license',
                'team',
                'username',
                'profilePicture',
                'createdAt',
                'updatedAt'
            ],
            include: [
                {
                    model: Access,
                    attributes: ["access_name"]
                },
                {
                    model: Area,
                    attributes: ["area"]
                }
            ]
        });

        // ส่งข้อมูล Officer ที่ดึงมาได้กลับไปให้ client
        res.status(200).json({
            status: "success",
            data: officers
        });

    } catch (error) {
        console.error("Error fetching officers:", error);
        res.status(500).json({
            status: "error",
            message: "เกิดข้อผิดพลาดในการดึงข้อมูล Officer"
        });
    }
};


const upload = multer({ storage: multer.memoryStorage() });

exports.createOfficer = async (req, res) => {
    try {
        // รับข้อมูลจาก Request body
        const { accessRights, areaId, code, firstName, lastName, email, phone, license, team, username, password } = req.body;
        const profilePicture = req.file ? req.file.buffer : null; // ตรวจสอบว่า req.file ถูกกำหนด

        // ตรวจสอบว่ามีข้อมูลสำคัญครบถ้วน
        if (!accessRights || !areaId || !code || !firstName || !lastName || !email || !phone || !license || !team || !username || !password) {
            return res.status(400).send({
                message: "ข้อมูลสำคัญไม่ครบถ้วน"
            });
        }

        // สร้างข้อมูล Officer ใหม่
        const officer = await Officer.create({
            accessRights,
            areaId,
            code,
            firstName,
            lastName,
            email,
            phone,
            license,
            team,
            username,
            password,
            profilePicture // รูปโปรไฟล์สามารถเป็น BLOB หรือข้อมูลในรูปแบบอื่นที่คุณกำหนด
        });

        // ส่งข้อมูล Officer ที่สร้างสำเร็จกลับไปให้ client
        res.status(201).send(officer);

    } catch (error) {
        console.error("Error creating officer:", error);
        res.status(500).send({
            message: "เกิดข้อผิดพลาดในการสร้างข้อมูล Officer"
        });
    }
};

// Export multer upload middleware
exports.upload = upload.single('profilePicture');

exports.getUserProfile = async (req, res) => {
    try {
        console.log('req.user:', req.user);
        // ตรวจสอบว่า req.user และ req.user.id ถูกกำหนดค่า
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'Invalid user information' });
        }

        // ใช้ข้อมูลจาก req.user.id ซึ่งถูกตั้งค่าโดย verifyToken middleware
        const user = await Officer.findByPk(req.user.id, {
            include: [
                {
                    model: Access,
                    as: 'access'
                }
            ],
            attributes: { exclude: ['password'] } // ไม่รวมรหัสผ่านใน response
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ถ้าคุณต้องการแปลงรูปภาพเป็น base64
        if (user.profilePicture) {
            user.profilePicture = Buffer.from(user.profilePicture).toString('base64');
        }

        // ส่งข้อมูล user profile กลับไปยัง client
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


