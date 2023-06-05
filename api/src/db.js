const { Sequelize } = require('sequelize');
require('dotenv').config();
const BreedModel = require('./models/Breed');
const TemperamentModel = require('./models/Temperament')

const {
    DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
logging: false,
});




//! Aca inyecto las tablas (modelos) a la base de datos
BreedModel(database)
TemperamentModel(database)

//* Desestructuro los modelos de la base de datos
const { Breed, Temperament } = database.models;

//? Aca se declaran las relaciones entre los modelos
Breed.belongsToMany(Temperament, { through: "Breed_Temp" })
Temperament.belongsToMany(Breed, {through: "Breed_Temp"})

module.exports = { database, ...database.models };