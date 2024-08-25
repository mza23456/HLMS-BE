module.exports = (sequelize, DataTypes) => {
    const Access = sequelize.define("access", {
        access_id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        access_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: true // Add createdAt and updatedAt fields (optional)
    });

    return Access;
};
