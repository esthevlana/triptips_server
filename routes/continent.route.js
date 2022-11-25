const router = require('express').Router();
const Continent = require('../models/Continent.model');

router.get('/continent', async (req, res,next) => {
    try {
        const allCountries = await Article.find().populate('allCountries');
        res.status(200).json(allCountries);
    } catch(error){
        next(error)
    }
  });

module.exports = router;