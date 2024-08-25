module.exports = (sequelize, DataTypes) => {
    const Area = sequelize.define("area", {
        areaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        branch: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        area: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        province: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        region: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: true // Add createdAt and updatedAt fields
    });

    return Area;
};
