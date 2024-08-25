module.exports = (sequelize, DataTypes) => {
    const Messenger = sequelize.define("messenger", {
        messengerId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                is: /^[0-9]+$/ // Only allows numbers
            }
        }
    });

    return Messenger;
};
