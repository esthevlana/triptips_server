const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });

  module.exports = router;