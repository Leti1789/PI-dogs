const { DataTypes } = require('sequelize')


const Temperament = (database) => {
    database.define('Temperament',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true

        }
    )
}

module.exports = Temperament;