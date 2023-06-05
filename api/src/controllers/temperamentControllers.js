const { Temperament } = require('../db')
const axios = require('axios')

const { MY_API_KEY } = process.env;


const tempsApi = async () => {
    let urLink = `https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`
    const { data } = await axios.get(urLink)
    let arr = []
    let allTemps = []
    data.forEach((el) => {
        if(el.temperament)
        arr.push(el.temperament.split(', '))
    })
    arr.forEach(el => {
        allTemps.push(...el)
    })
    allTemps = [...new Set(allTemps)].sort()
    const filas = allTemps.map(el => {
        return {'name': el}
    })
    return filas
}

const temperamentsToDb = async () => {
    if(!await Temperament.count()){
    const allTemps = await tempsApi()
    await Temperament.bulkCreate(allTemps)
        return await Temperament.findAll()
    }
    else return await Temperament.findAll()
}

module.exports = {temperamentsToDb}
