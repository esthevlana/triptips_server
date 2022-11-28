const router = require("express").Router();
const Article = require("../models/Article.model");

router.get("/", async (req, res, next) => {
  try {
    const sixArticles = await Article.find().limit(6);
    res.status(200).json(sixArticles);

    /* como renderizar os artigos do mais recente para o mais antigo? */
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { countryName } = req.query;
    const foundCountry = await Article.find({
      countryName: { $regex: new RegExp(countryName, "i") },
    });
    res.status(200).json(foundCountry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
