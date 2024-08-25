module.exports = (sequelize, DataTypes) => {
    const Commission = sequelize.define("commission", {
        commissionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        officerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        applyingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateCreate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false // Add this if you don't want to use createdAt and updatedAt
    });

    return Commission;
};
