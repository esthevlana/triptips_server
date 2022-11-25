const router = require('express').Router();
const User = require('../models/User.model');

/* Get all profile */
router.get('/profile', async(req, res) => {
    try {
      const userId = req.session.currentUser._id;
      const user = await User.findById(userId)
      .populate("favArticles")
      .populate("favTouristPlaces")
      .populate("favLodgin")
      .populate("favRestaurants")
      res.status(200).json(user);
      console.log(user)
    } catch (error) {
    }
  });
  
  
  /* Edit profile */
  router.get('/profile-edit/:id', async (req, res, next) => {
    try {
      const updatedUser = await User.findById(req.params.id);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  router.post('/profile-edit/:id', async (req, res, next) => {
    try {
    const {id} = req.params;
    const { username, imageUser} = req.body
      
    if(req.file) {
      const updatedProfile = await User.findByIdAndUpdate( id, {imageUser: req.file.path}, {new: true})
      res.status(200).json(updatedProfile);
     
     if(!req.file) {
      const updatedProfile = await User.findByIdAndUpdate( id, {new: true})
      res.status(200).json(updatedProfile);
    }}
  
  } catch (error) {
    next(error);
  }
  });

  /* Delete specific things on profile */

  router.delete('/profile/:id', async (req, res, next) => {
    try {

        const deleteFavArticle = req.body;
        const deleteFavTouristPlace = req.body;
        const deleteFavLodgin = req.body;
        const deleteFavRestaurant = req.body;

        await User.findOneAndRemove(deleteFavArticle);
        await User.findOneAndRemove(deleteFavTouristPlace);
        await User.findOneAndRemove(deleteFavLodgin);
        await User.findOneAndRemove(deleteFavRestaurant);

        res.status(200).json({message: `The selected item was deleted successfully`});

    } catch (error){
        next(error)
    }
})

module.exports = router;