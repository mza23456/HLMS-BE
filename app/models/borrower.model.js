module.exports = (sequelize, DataTypes) => {
    const Borrower = sequelize.define("borrower", {
        borrowerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idCard: {
            type: DataTypes.STRING(17),
            allowNull: false,
            validate: {
                len: [13, 17] // ตรวจสอบความยาวของหมายเลขบัตรประชาชน
            }
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                isIn: [['male', 'female', 'other']] // กำหนดค่าที่อนุญาตสำหรับเพศ
            }
        },
        birthyear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1900,
                max: new Date().getFullYear() // ตรวจสอบปีเกิด
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 0 // ตรวจสอบอายุ
            }
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                is: /^[0-9]+$/ // ตรวจสอบว่าเป็นตัวเลข
            }
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isEmail: true // ตรวจสอบว่าเป็นอีเมลที่ถูกต้อง
            }
        },
        career: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        income: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 0 // ตรวจสอบรายได้
            }
        },
        outcome: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 0 // ตรวจสอบค่าใช้จ่าย
            }
        }
    }, {
        timestamps: true // Add createdAt and updatedAt fields (optional)
    });

    return Borrower;
};
