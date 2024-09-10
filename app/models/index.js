const config = require("../config/db");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        port: config.port,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.borrower = require("./borrower.model")(sequelize, Sequelize.DataTypes);
db.project = require("./project.model")(sequelize, Sequelize.DataTypes);
db.officer = require("./officer.model")(sequelize, Sequelize.DataTypes);
db.access = require("./accessRight.model")(sequelize, Sequelize.DataTypes);
db.area = require("./area.model")(sequelize, Sequelize.DataTypes);
db.commission = require("./commission.model")(sequelize, Sequelize.DataTypes);
db.messenger_area = require("./messenger_area.model")(sequelize, Sequelize.DataTypes);
db.messenger = require("./messenger.model")(sequelize, Sequelize.DataTypes);
db.messengerOrder = require("./messengerOrder.model")(sequelize, Sequelize.DataTypes);

// Relation tables
db.access.hasMany(db.officer, { foreignKey: 'accessRights', onDelete: 'CASCADE' });
db.officer.belongsTo(db.access, { foreignKey: 'accessRights' ,as: 'access'});

db.area.hasMany(db.officer, { foreignKey: 'areaId', onDelete: 'CASCADE' });
db.officer.belongsTo(db.area, { foreignKey: 'areaId' });

db.officer.hasMany(db.commission, { foreignKey: 'officerId', onDelete: 'CASCADE' });
db.commission.belongsTo(db.officer, { foreignKey: 'officerId' });

db.messenger.belongsToMany(db.area, { through: db.messenger_area, foreignKey: 'messengerId', onDelete: 'CASCADE' });
db.area.belongsToMany(db.messenger, { through: db.messenger_area, foreignKey: 'areaId', onDelete: 'CASCADE' });

db.officer.hasMany(db.messengerOrder, { foreignKey: 'officerId', onDelete: 'CASCADE' });
db.messengerOrder.belongsTo(db.officer, { foreignKey: 'officerId' });

db.messenger_area.hasMany(db.messengerOrder, { foreignKey: 'maId', onDelete: 'CASCADE' });
db.messengerOrder.belongsTo(db.messenger_area, { foreignKey: 'maId' });

db.officer.hasMany(db.project, { foreignKey: 'officerId', onDelete: 'CASCADE' });
db.project.belongsTo(db.officer, { foreignKey: 'officerId' });

db.area.hasMany(db.project, { foreignKey: 'areaId', onDelete: 'CASCADE' });
db.project.belongsTo(db.area, { foreignKey: 'areaId' });

// Sync all models with the database
sequelize.sync()
    .then(() => {
        console.log("All tables and models synced successfully!");
    })
    .catch(err => {
        console.error("Error syncing tables and models:", err);
    });

module.exports = db;
