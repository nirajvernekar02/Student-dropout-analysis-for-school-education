const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Route to create a new school
router.post('/create-school', schoolController.createSchool);

// Route to get all schools
router.get('/get-schools', schoolController.getAllSchools);

// Route to update a school by ID
router.put('/update-school/:id', schoolController.updateSchoolById);

// Route to delete a school by ID
router.delete('/delete-school/:id', schoolController.deleteSchoolById);

module.exports = router;
