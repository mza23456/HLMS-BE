module.exports = (sequelize, DataTypes) => {

    const MessengerOrder = sequelize.define("messenger_order", {
        mold: { 
            type: DataTypes.INTEGER,
            autoIncrement: true, // เพิ่มค่าตัวเลขอัตโนมัติสำหรับ Primary Key
            allowNull: false,
            primaryKey: true
        },
        maId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        officerId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateExecute: { 
            type: DataTypes.DATE,
            allowNull: true 
        },
        dateReceive: { 
            type: DataTypes.DATE,
            allowNull: true 
        },
        building: { 
            type: DataTypes.STRING(150),
            allowNull: true 
        },
        phoneTeam: { 
            type: DataTypes.STRING(15),
            allowNull: true 
        },
        classOrder: { 
            type: DataTypes.STRING(10),
            allowNull: true 
        },
        firstName: { 
            type: DataTypes.STRING(30),
            allowNull: true 
        },
        lastName: { 
            type: DataTypes.STRING(30),
            allowNull: true 
        },
        address: { 
            type: DataTypes.STRING(255),
            allowNull: true 
        },
        phone: { 
            type: DataTypes.STRING(15),
            allowNull: true,
            validate: {
                is: /^[0-9]+$/ // Only allows numbers
            }
        },
        phone2: { 
            type: DataTypes.STRING(15),
            allowNull: true,
            validate: {
                is: /^[0-9]+$/ // Only allows numbers
            }
        },
        document: { 
            type: DataTypes.STRING(250),
            allowNull: true 
        },
        serviceCharge: { 
            type: DataTypes.INTEGER,
            allowNull: true 
        },
        other: { 
            type: DataTypes.STRING(150),
            allowNull: true 
        },
        status: { 
            type: DataTypes.STRING(20),
            allowNull: true 
        }
    }, {
        timestamps: true // Add createdAt and updatedAt fields
    });

    return MessengerOrder;
};
