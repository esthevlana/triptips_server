const router = require("express").Router();
const Continent = require("../models/Continent.model");
const Article = require("../models/Article.model");

/* router.get('/search-continent/:continent', async (req, res, next) => {
    try {
        const continent = req.params.continent

        if (continent == 'America'){
            const foundCountries = await Country.find({ 'continent': 'America' })
            res.render('searchResult', { foundCountries });
        } else if (continent == 'Africa'){
            const foundCountries = await Country.find({ 'continent': 'Africa' })
            res.render('searchResult', { foundCountries });
        } else if (continent == 'Asia'){
            const foundCountries = await Country.find({ 'continent': 'Asia' })
            res.render('searchResult', { foundCountries });
        } else if (continent == 'Europe'){
            const foundCountries = await Country.find({ 'continent': 'Europe' })
            res.render('searchResult', { foundCountries });
        } else if (continent == 'Oceania'){
            const foundCountries = await Country.find({ 'continent': 'Oceania' })
            res.render('searchResult', { foundCountries });
        }

    } catch (error) {
        console.log(error)
    }

}) */

router.get("/search-continent/:continent", async (req, res, next) => {
  try {
    const { continent } = req.params;
    const searchedContinent = await Continent.findOne({
      continent: { $regex: continent, $options: "i" },
    });

    //countries que vão ter artigos
    let countries = [];
    console.log(searchedContinent);

    //pesquisar artigos por country
    for (var i = 0; i < searchedContinent.countries.length; i++) {
      const findArticles = await Article.find({
        countryName: searchedContinent.countries[i],
      });

      if (findArticles.length > 0) {
        countries = [...countries, findArticles];
        console.log("inside", countries);
      }
    }

    if (i === searchedContinent.countries.length)
      res.status(200).json(countries);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

//GET ALL CONTINENTS
router.get("/continents", async (req, res, next) => {
  try {
    const allContinent = await Continent.find();

    res.status(200).json(allContinent);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

router.get("/countries/:thisContinent", async (req, res, next) => {
  try {
    const { thisContinent } = req.params;
    const allContinent = await Continent.findOne({ continent: thisContinent });

    res.status(200).json(allContinent.countries);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

module.exports = router;
