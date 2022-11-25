const router = require('express').Router();
const Article = require('../models/Article.model');

/* Get all articles */  
router.get('/articles', async (req, res,next) => {
    try {
        const allArticles = await Article.find().populate('articles');
        res.status(200).json(allArticles);
    } catch(error){
        next(error)
    }
  });

/* Create new article */
router.post('/articles', async (req, res, next) => {
try {

    const {title, countryName, description, continentName, imgCountry, touristcPlaces, lodgin, restaurants} = req.body;
    const newArticle = await Article.create({title, countryName, description, continentName, imgCountry, touristcPlaces, lodgin, restaurants});

    res.status(200).json(newArticle);


} catch(error){
    res.json(error)
    next(error)
}

});

/* Get a single article */
router.get('articles/:id', async (req, res,next) => {
    try {

        const {id} = req.params;
        const singleArticle = await Article.findById(id).populate('articles');
        res.status(200).json(singleArticle);

    }catch(error){
        next(error)
    }
});

/* Edit article */
router.put('/articles/:id', async(req, res, next) => {
    try {

        const {id} = req.params;
        const {title, countryName, description, continentName, imgCountry, touristcPlaces, lodgin, restaurants} = req.body;

        const updatedArticle = await Article.findByIdAndUpdate(id, {title, countryName, description, continentName, imgCountry, touristcPlaces, lodgin, restaurants},  
            { new: true } 
        );
        
        res.status(200).json(updatedArticle);
    } catch (error) {
        next(error)
    }
});

/* Delete route */
router.delete('/article/:id', async (req, res, next) => {
    try {

        const {id} = req.params;

        await Article.findByIdAndRemove(id)

        res.status(200).json({message: `The article with id ${id} was deleted successfully`});

    } catch (error){
        next(error)
    }
})

router.get('/liked-article/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.session.currentUser._id

        await User.findByIdAndUpdate(userId, { $push: { likedArticles: id } })
        await Article.findByIdAndUpdate(id, { $push: { allLikes: userId } })

        res.status(200).json();
    } catch (error) {
        console.log(error)
    }
})

router.get('/favourite-article/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.session.currentUser._id

        await User.findByIdAndUpdate(userId, { $push: { favArticles: id } })
        await Article.findByIdAndUpdate(id, { $push: { allFavs: userId } })

        res.status(200).json();
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;