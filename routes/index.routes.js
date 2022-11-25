const express = require("express");
const router = express.Router();
const seeds = require("../bin/seeds.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post('/continents', async (req,res, next) => {
  seeds();
});

router.get('/search', async (req, res, next) => {
  try {
      const { countryName } = req.query;
      const foundCountry = await Article.find({ countryName: { $regex: new RegExp(countryName, "i") } })
      console.log(foundCountry)
      res.render('searchResult', { foundCountry });
  } catch (error) {
      console.log(error)
  }

})


module.exports = router;
