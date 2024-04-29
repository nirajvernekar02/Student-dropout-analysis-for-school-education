const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const schoolController = require('../controllers/schoolController');

// Route to create a new school
router.post(
  '/create-school',
  [
    body('name').notEmpty().isString(),
    body('location.area').notEmpty().isString(),
    body('location.city').notEmpty().isString(),
    body('location.state').notEmpty().isString(),
    body('type').notEmpty().isString().isIn(['government', 'private']), // Assuming type should be either 'government' or 'private'
  ],
  schoolController.createSchool
);

// Route to get all schools
router.get('/get-schools', schoolController.getAllSchools);

// Route to update a school by ID
router.put(
  '/update-school/:id',
  [
    body('name').notEmpty().isString(),
    body('location.area').notEmpty().isString(),
    body('location.city').notEmpty().isString(),
    body('location.state').notEmpty().isString(),
    body('type').notEmpty().isString().isIn(['government', 'private']), // Assuming type should be either 'government' or 'private'
  ],
  schoolController.updateSchoolById
);

// Route to delete a school by ID
router.delete('/delete-school/:id', schoolController.deleteSchoolById);

module.exports = router;
