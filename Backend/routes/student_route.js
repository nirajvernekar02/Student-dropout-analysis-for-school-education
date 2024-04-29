const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to create a new student
router.post('/create-student', studentController.createStudent);

// Route to get all students
router.get('/get-students', studentController.getAllStudents);

// Route to update a student by ID
router.put('/update-student/:id', studentController.updateStudentById);

// Route to delete a student by ID
router.delete('/delete-student/:id', studentController.deleteStudentById);

module.exports = router;
