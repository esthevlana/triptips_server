const router = require("express").Router();
const Article = require("../models/Article.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

/* Create new article */
router.post("/articlescreate", async (req, res, next) => {
  try {
    const {
      title,
      countryName,
      description,
      continentName,
      imageUrl,
      creator,
    } = req.body;

    const newArticle = await Article.create({
      title,
      countryName,
      description,
      continentName,
      creator,
      imgCountry: imageUrl,
    });

    res.status(200).json(newArticle);
  } catch (error) {
    res.json(error);
    next(error);
  }
});

router.post("/reviewcreate/:articleId", async (req, res, next) => {
  try {
    const { name, comment, rating, place } = req.body;
    const newReview = await Review.create({
      name,
      comment,
      rating,
      place,
    });

    const { articleId } = req.params;

    if (newReview.place === "Restaurant") {
      const updateArticle = await Article.findByIdAndUpdate(articleId, {
        $push: { restaurants: newReview._id },
      });
    } else if (newReview.place === "Tourist Place") {
      const updateArticle = await Article.findByIdAndUpdate(articleId, {
        $push: { touristPlaces: newReview._id },
      });
    } else {
      const updateArticle = await Article.findByIdAndUpdate(articleId, {
        $push: { lodgin: newReview._id },
      });
    }

    res.status(200).json(newReview);
  } catch (error) {
    next(error);
  }
});

/* Get a single article */
router.get("articles/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleArticle = await Article.findById(id);
    res.status(200).json(singleArticle);
  } catch (error) {
    next(error);
  }
});

/* Edit article */
router.put("/articles/edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      countryName,
      description,
      continentName,
      imgCountry,
      touristcPlaces,
      lodgin,
      restaurants,
    } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        title,
        countryName,
        description,
        continentName,
        imgCountry,
        touristcPlaces,
        lodgin,
        restaurants,
      },
      { new: true }
    );

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
});

/* Delete route */
router.delete("/article/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await Article.findByIdAndRemove(id);

    res.status(200).json({ message: `The article was deleted successfully` });
  } catch (error) {
    next(error);
  }
});

router.get("/liked-article/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.payload._id;

    const thisArticle = await Article.findById(id);

    if (thisArticle.allLikes.includes(userId)) {
      await Article.findByIdAndUpdate(id, { $pull: { allLikes: userId } });
      res.status(200).json({ message: `Article Disliked` });
    } else {
      await Article.findByIdAndUpdate(id, { $push: { allLikes: userId } });
      res.status(200).json({ message: `Article Liked` });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/favourite-article/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.payload._id;

    const thisArticle = await Article.findById(id);

    if (thisArticle.allFavs.includes(userId)) {
      await Article.findByIdAndUpdate(id, { $pull: { allFavs: userId } });
      res.status(200).json({ message: `Article Disfavourite` });
    } else {
      await Article.findByIdAndUpdate(id, { $push: { allFavs: userId } });
      res.status(200).json({ message: `Article Favourited` });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/fav-touristplaces/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.payload._id;

    const thisUser = await User.findById(userId);

    if (thisUser.favTouristPlaces.includes(userId)) {
      await User.findByIdAndUpdate(userId, { $pull: { favTouristPlaces: id } });
      res.status(200).json({ message: `Tourist Place Disfavourite` });
    } else {
      await User.findByIdAndUpdate(userId, { $push: { favTouristPlaces: id } });
      res.status(200).json({ message: `Tourist Place Favourited` });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/fav-lodgin/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.payload._id;

    const thisUser = await User.findById(userId);

    if (thisUser.favLodgin.includes(userId)) {
      await User.findByIdAndUpdate(userId, { $pull: { favLodgin: id } });
      res.status(200).json({ message: `Lodgin Disfavourite` });
    } else {
      await User.findByIdAndUpdate(userId, { $push: { favLodgin: id } });
      res.status(200).json({ message: `Lodgin Favourited` });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/fav-restaurant/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.payload._id;

    const thisUser = await User.findById(userId);

    if (thisUser.favRestaurants.includes(userId)) {
      await User.findByIdAndUpdate(userId, { $pull: { favRestaurants: id } });
      res.status(200).json({ message: `Restaurant Disfavourite` });
    } else {
      await User.findByIdAndUpdate(userId, { $push: { favRestaurants: id } });
      res.status(200).json({ message: `Restaurant Favourited` });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
