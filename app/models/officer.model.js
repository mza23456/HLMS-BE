module.exports = (sequelize, DataTypes) => {
    

    const Officer = sequelize.define("officer", {
        officerId: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        accessRights: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        areaId: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                is: /^[0-9]+$/ // Only allows numbers
            }
        },
        license: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        team: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePicture: { 
            type: DataTypes.BLOB("long"),
            allowNull: true
        }
    }, {
        timestamps: true // Add createdAt and updatedAt fields
    });

    // Hash password before saving to the database
    Officer.beforeCreate(async (officer) => {
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        officer.password = await bcrypt.hash(officer.password, salt);
    });

    return Officer;
};
