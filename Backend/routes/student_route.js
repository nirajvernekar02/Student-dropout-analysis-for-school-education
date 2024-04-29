const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const studentController = require('../controllers/studentController');

// Route to create a new student
router.post(
  '/create-student',
  [
    body('name').notEmpty().isString(),
    body('gender').notEmpty().isString(),
    body('age').notEmpty().isInt({ min: 0 }),
    body('standard').notEmpty().isInt({ min: 1 }),
    body('caste').notEmpty().isString(),
    body('schoolId').notEmpty().isMongoId(),
  ],
  studentController.createStudent
);

// Route to get all students
router.get('/get-students', studentController.getAllStudents);

// Route to update a student by ID
router.put(
  '/update-student/:id',
  [
    body('name').notEmpty().isString(),
    body('gender').notEmpty().isString(),
    body('age').notEmpty().isInt({ min: 0 }),
    body('standard').notEmpty().isInt({ min: 1 }),
    body('caste').notEmpty().isString(),
    body('schoolId').notEmpty().isMongoId(),
  ],
  studentController.updateStudentById
);

// Route to delete a student by ID
router.delete('/delete-student/:id', studentController.deleteStudentById);

module.exports = router;
