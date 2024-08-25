module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("project", {
        projectId: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        officerId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        areaId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner: { 
            type: DataTypes.STRING(150), 
            allowNull: false
        },
        name: { 
            type: DataTypes.STRING(150), 
            allowNull: false
        },
        type: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        minPrice: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maxPrice: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        progress: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deal: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        saleName: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        phone: { 
            type: DataTypes.STRING(15),
            allowNull: false
        },
        dateCreate: { 
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return Project;
};
