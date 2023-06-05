const axios = require('axios');
const { MY_API_KEY } = process.env;
const { Breed, Temperament } = require("../db");


let urLink = `https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`;


//! Esta funcion trae la informacion de la api

const dataApi = async () => {
    const { data } = await axios.get(urLink)


    const apiData = data.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.image.url,
            minHeight: el.height.metric.slice(0, 2).replace(' ', '').replace('-', ''),
            maxHeight: el.height.metric.slice(-3).replace(' ', '').replace('-', ''),
            minWeight: el.weight.metric.slice(0, 2).replace(' ', '').replace('-', ''),
            maxWeight: el.weight.metric.slice(-3).replace(' ', '').replace('-', ''),
            lifeSpan: el.life_span,
            Temperaments: el.temperament?.split(', ').map(t => {
                return {'name': t}
            }),
            createdInDb: false
            
        }
    })
    return apiData;
};

//? Esta funcion va a traer la informacion desde mi base de datos.

const getFromDb = async () => {
    return await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], // atributos que quiero traer del modelo Temperament, el id viene automaticamente
            through: {
                attributes: [], // mediante los  atributos
            }
        }
    });
    
}


//* Esta funcion va a traer todo tanto la info de la API como de la BD

const getAllDogs = async () => {
    const dataFromApi = await dataApi();
    const dataFromDb = await getFromDb();

    const allDogs = [...dataFromApi, ...dataFromDb];

    return allDogs;
};

//? Esta funcion busca un perro por query, si no lo encuentra arroja un error
const findDogs = async (name) => {

    let allInfo = await getAllDogs();
    const results = allInfo.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));

    if (results.length === 0) throw new Error(`No se encontro un perro con el nombre: ${name}`); // Si el array esta vacio arroja un error!

    return results;
}

const createDog = async ( name, image, minHeight, maxHeight, minWeight, maxWeight, lifeSpan, temperament) => {
    
    const newDog = await Breed.create({
        name,
        image,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        lifeSpan
    });
    
    let associatedTemp = await Temperament.findAll({
        where: { name: temperament }

    });

    newDog.addTemperament(associatedTemp)

    return newDog;
    
}






const getDogsById = async(idRaza) => {
    const allDogs = await getAllDogs();
    const allDogsById = allDogs.find((dog => dog.id == idRaza));

    if (!allDogsById) throw new Error (`No existe el perro con el id: ${idRaza}`)

    return allDogsById;
}



module.exports = {
    dataApi,
    getFromDb,
    getAllDogs,
    findDogs,
    createDog,
    getDogsById
}