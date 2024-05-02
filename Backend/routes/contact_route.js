const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact_controller');

// Route to handle contact form submissions
router.post('/contact', contactController.submitContactForm);

module.exports = router;
