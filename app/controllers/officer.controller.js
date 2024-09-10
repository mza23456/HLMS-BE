const db = require("../models");
const multer = require('multer');
const Officer = db.officer;
const Area = db.area;
const Access = db.access;
const bcrypt = require('bcrypt');

// Multer configuration
const upload = multer({ storage: multer.memoryStorage() });
exports.upload = upload; // Export multer configuration for use in routes

exports.findAllOfficers = async (req, res) => {
    try {
        // Fetch all officers from the database
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
                    attributes: ["branch", "area", "province", "region"]
                }
            ]
        });

        // Return the fetched officer data to the client
        res.status(200).json({
            status: "success",
            data: officers
        });

    } catch (error) {
        console.error("Error fetching officers:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred while fetching officers"
        });
    }
};

exports.createOfficer = async (req, res) => {
    try {
        // Extract data from request body
        const { accessRights, areaId, code, firstName, lastName, email, phone, license, team, username, password } = req.body;
        const profilePicture = req.file ? req.file.buffer : null; // Check if profile picture is provided

        // Check if essential data is provided
        if (!accessRights || !areaId || !code || !firstName || !lastName || !email || !phone || !license || !team || !username || !password) {
            return res.status(400).send({
                message: "Missing essential officer data"
            });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new officer
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
            password: hashedPassword, // Save hashed password
            profilePicture // Profile picture as a BLOB
        });

        // Return the newly created officer to the client
        res.status(201).send(officer);

    } catch (error) {
        console.error("Error creating officer:", error);
        res.status(500).send({
            message: "An error occurred while creating the officer"
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        console.log('req.user:', req.user);
        // Check if user data is available
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'Invalid user information' });
        }

        // Fetch user data using user ID from the verified token
        const user = await Officer.findByPk(req.user.id, {
            include: [
                {
                    model: Access,
                    as: 'access'
                },
                {
                    model: Area,
                    attributes: ["branch", "area", "province", "region"]
                }
            ],
            attributes: { exclude: ['password'] } // Exclude password from the response
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Convert profile picture to base64 if available
        if (user.profilePicture) {
            user.profilePicture = Buffer.from(user.profilePicture).toString('base64');
        }

        // Return user profile data
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateOfficer = async (req, res) => {
    const { id } = req.params;
    const officerData = req.body;

    console.log('Officer data before update:', officerData);

    try {
        // ตรวจสอบว่ามีข้อมูลใน req.body หรือไม่
        if (Object.keys(officerData).length === 0) {
            return res.status(400).send('No data provided for update');
        }

        // อัปเดตข้อมูล
        await Officer.update(officerData, { where: { officerId: id } });

        // ตรวจสอบข้อมูลหลังอัปเดต
        const updatedOfficer = await Officer.findByPk(id);
        console.log('Officer data after update:', updatedOfficer);

        res.status(200).json(updatedOfficer);
    } catch (error) {
        console.error('Error updating officer:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateOfficerAllData = async (req, res) => {
    try {
        const officerId = req.params.id; // Get officerId from URL parameters
        const authenticatedUserId = req.user.id; // Get userId from token
        // const authenticatedUserRole = req.user.accessUser; // Get user role from token

        if (!officerId) {
            return res.status(400).json({ message: "Officer ID is missing" });
        }

        const officer = await Officer.findByPk(officerId);

        if (!officer) {
            return res.status(404).json({ message: "Officer not found" });
        }

        // Allow admin or specific roles to update any profile เก็บไว้validate role 
        // if (officerId !== authenticatedUserId) {
        //     return res.status(403).json({ message: "Unauthorized to update this officer" });
        // }

        const { accessRights, areaId, code, firstName, lastName, email, phone, license, team, username, password } = req.body;
        const profilePicture = req.file ? req.file.buffer : null;

        // Update officer details
        officer.accessRights = accessRights !== undefined ? accessRights : officer.accessRights;
        officer.areaId = areaId !== undefined ? areaId : officer.areaId;
        officer.code = code !== undefined ? code : officer.code;
        officer.firstName = firstName !== undefined ? firstName : officer.firstName;
        officer.lastName = lastName !== undefined ? lastName : officer.lastName;
        officer.email = email !== undefined ? email : officer.email;
        officer.phone = phone !== undefined ? phone : officer.phone;
        officer.license = license !== undefined ? license : officer.license;
        officer.team = team !== undefined ? team : officer.team;
        officer.username = username !== undefined ? username : officer.username;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            officer.password = await bcrypt.hash(password, salt);
        }

        if (profilePicture) {
            officer.profilePicture = profilePicture;
        }

        await officer.save();

        res.status(200).json({
            message: "Officer updated successfully",
            data: officer
        });
    } catch (error) {
        console.error("Error updating officer:", error);
        res.status(500).json({
            message: "An error occurred while updating officer data"
        });
    }
};

