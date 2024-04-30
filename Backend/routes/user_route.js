const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const userController = require('../controllers/userController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profilePictures'); 
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by appending the current timestamp to the original filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Routes
router.post('/register-user', userController.registerUser);
router.put('/update-user', userController.updateUserProfile);
router.post('/login', userController.loginUser);

// Route to upload profile picture
router.post('/upload-profile', upload.single('profilePicture'), userController.uploadProfilePicture);

module.exports = router;
