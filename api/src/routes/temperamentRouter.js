const { Router } = require('express');

const tempRouter = Router();
const {temperamentsToDb} = require('../controllers/temperamentControllers')

//* Traer y persistir en DB los temperamentos

tempRouter.get('/', async (req, res) => {
    try {
        const temperaments = await temperamentsToDb()
        return res.json(temperaments)
        
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})






module.exports = tempRouter;