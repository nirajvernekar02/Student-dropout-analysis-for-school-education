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
      // Extract the original filename and remove any special characters
      const originalFilename = file.originalname.replace(/[^\w.-]/g, '_');
      cb(null, originalFilename);
    }
  });
  
  // Multer upload instance
  const upload = multer({ storage: storage });
// Routes
router.post('/register-user', userController.registerUser);
router.put('/update-user', userController.updateUserProfile);
router.post('/login', userController.loginUser);

// Route to upload profile picture
router.post('/upload-profile', upload.single('profilePicture'), userController.uploadProfilePicture);

// Route to fetch profile picture by user ID
router.get('/profile-picture/:userId', userController.getProfilePicture);


module.exports = router;
