const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const path = require('path');
const multer = require('multer');
const importStudents = require('../helpers/studentbulkimport')
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  // Multer upload instance
  const upload = multer({ storage: storage });

// Route for importing students from CSV file
router.post('/import-students', upload.single('file'), importStudents.importStudents);

// Route to create a new student
router.post('/create-student', studentController.createStudent);

// Route to get all students
router.get('/get-students', studentController.getAllStudents);

// Route to update a student by ID
router.put('/update-student/:id', studentController.updateStudentById);

// Route to delete a student by ID
router.delete('/delete-student/:id', studentController.deleteStudentById);

module.exports = router;
