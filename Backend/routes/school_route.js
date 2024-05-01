const express = require('express');
const router = express.Router();
const multer = require('multer')
const schoolController = require('../controllers/schoolController');
const importSchools = require('../helpers/schoolbulkimport')
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/ImportSchools'); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  // Multer upload instance
  const upload = multer({ storage: storage });

// Route for importing students from CSV file
router.post('/import-school', upload.single('file'), importSchools.importSchools);

// Route to create a new school
router.post('/create-school', schoolController.createSchool);

// Route to get all schools
router.get('/get-schools', schoolController.getAllSchools);

// Route to update a school by ID
router.put('/update-school/:id', schoolController.updateSchoolById);

// Route to delete a school by ID
router.delete('/delete-school/:id', schoolController.deleteSchoolById);

router.get('/get-by-id',schoolController.getSchoolById)

module.exports = router;
