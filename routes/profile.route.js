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
    next(error);t

  }
  });

  /* Delete specific things on profile */

  router.post('/tasks', async(req, res, next) => {
    try {

        const {title, description, projectId} = req.body; //tha name (project) matters because it's the same name we need to use on post man 
        
        //Create the task
        const newTask = await TaskModel.create({title, description, project: projectId }) //it's 'project' because in the model (Task) we called it project
        
        await Project.findByIdAndUpdate(projectId, {$push: {tasks: newTask._id}});

        //201 means Created
        res.status(201).json(newTask);

    } catch (error) {
        next(error);
    }
})

module.exports = router;