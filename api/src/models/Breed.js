const { DataTypes } = require('sequelize')


const Breed = (database) => {
    database.define('Breed',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
                
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            minHeight: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            maxHeight: {
                type: DataTypes.STRING,
                allowNull: false
            },
            minWeight: {
                type: DataTypes.STRING,
                allowNull: false
            },
            maxWeight: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lifeSpan: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdInDb: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false
            }

        },

        {
            timestamps: false,
            freezeTableName: true

        }
    )
}

module.exports = Breed;