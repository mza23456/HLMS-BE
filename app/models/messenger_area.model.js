module.exports = (sequelize, Datatype) => {
    const MessengerArea = sequelize.define("messenger_area", {
        maId: { 
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        messengerId: {
            type: Datatype.INTEGER,
            allowNull: false
            
        },
        areaId: {
            type: Datatype.INTEGER,
            allowNull: false
        },
        road: {
            type: Datatype.STRING(150),
            allowNull: true 
        },
        soi: {
            type: Datatype.STRING(150),
            allowNull: true 
        },
        price: {
            type: Datatype.INTEGER,
            allowNull: false
        }
    });

    return MessengerArea;
};