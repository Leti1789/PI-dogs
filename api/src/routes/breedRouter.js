const { Router } = require('express');
const { getAllDogs, findDogs, createDog, getDogsById } = require('../controllers/breedControllers');

const breedRouter = Router();

breedRouter.get('/', async (req, res) => {
    const { name } = req.query;
    let dogs;
    try {
        if (name) {
            dogs = await findDogs(name)
        } else {
            dogs = await getAllDogs()
        }
        return res.json(dogs)
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
    
})



breedRouter.post('/', async (req, res) => {
    const { name, image, minHeight,  maxHeight,  minWeight, maxWeight, lifeSpan, temperament, createdInDb} = req.body;

    try {
        const newDog = await createDog( name, image, minHeight, maxHeight, minWeight, maxWeight, lifeSpan, temperament, createdInDb)
        return res.json({ msg:'the dog has been successfully created!','createdDog': newDog})
        
    } catch (error) {
        return res.status(404).json({error:error.message})
        
    }
});

breedRouter.get('/:idRaza', async (req, res) => {
    const { idRaza } = req.params;

    try {
        if (idRaza) {
            const allDogs = await getDogsById(idRaza)
            return res.json(allDogs)
        }
        
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})




module.exports = breedRouter;