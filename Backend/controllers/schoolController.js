const { body, param } = require('express-validator');
const School = require('../models/schoolmodel');

// Function to create a successful response
const createSuccessResponse = (res, data, message) => {
    res.status(200).json({
        status: 1,
        message: message || 'success',
        data: data || {}
    });
};

// Function to create a failure response
const createFailureResponse = (res, errorMessage) => {
    res.status(400).json({
        status: 0,
        message: 'failure',
        error: errorMessage,
    });
};

// Validation middleware for creating or updating a school
const validateSchool = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return createFailureResponse(res, errors.array());
    }
    next();
};

// Controller to create a new school
exports.createSchool = [
    // Add validation rules using express-validator
    body('name').notEmpty().isString(),
    body('location.area').notEmpty().isString(),
    body('location.city').notEmpty().isString(),
    body('location.state').notEmpty().isString(),
    body('location.pincode').notEmpty().isString(),
    body('location.mapLocation.coordinates').isArray({ min: 2, max: 2 }).withMessage('Coordinates must be an array with two elements'),
    // Add more validation rules as needed

    // Call the validation middleware before handling the request
    validateSchool,

    async (req, res) => {
        try {
            const newSchool = new School(req.body);
            await newSchool.save();
            createSuccessResponse(res, newSchool, 'School created successfully');
        } catch (error) {
            createFailureResponse(res, error.message);
        }
    }
];

// Controller to get all schools
exports.getAllSchools = async (req, res) => {
    try {
        const schools = await School.find();
        createSuccessResponse(res, schools, 'Schools retrieved successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to get a single school by ID
exports.getSchoolById = async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) {
            return createFailureResponse(res, 'School not found');
        }
        createSuccessResponse(res, school, 'School retrieved successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to update a school by ID
exports.updateSchoolById = async (req, res) => {
    try {
        const updatedSchool = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSchool) {
            return createFailureResponse(res, 'School not found');
        }
        createSuccessResponse(res, updatedSchool, 'School updated successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to delete a school by ID
exports.deleteSchoolById = async (req, res) => {
    try {
        const deletedSchool = await School.findByIdAndDelete(req.params.id);
        if (!deletedSchool) {
            return createFailureResponse(res, 'School not found');
        }
        createSuccessResponse(res, deletedSchool, 'School deleted successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};
