const { body, param } = require('express-validator');
const Student = require('../models/studentmodel');

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

// Validation middleware for creating or updating a student
const validateStudent = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return createFailureResponse(res, errors.array());
    }
    next();
};

// Controller to create a new student
exports.createStudent = [
    // Add validation rules using express-validator
    body('name').notEmpty().isString(),
    body('gender').notEmpty().isString(),
    body('age').notEmpty().isInt({ min: 0 }),
    body('standard').notEmpty().isInt({ min: 1 }),
    body('caste').notEmpty().isString(),
    body('schoolId').notEmpty().isMongoId(),
    // Add more validation rules as needed

    // Call the validation middleware before handling the request
    validateStudent,

    async (req, res) => {
        try {
            const newStudent = new Student(req.body);
            await newStudent.save();
            createSuccessResponse(res, newStudent, 'Student created successfully');
        } catch (error) {
            createFailureResponse(res, error.message);
        }
    }
];

// Controller to get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        createSuccessResponse(res, students, 'Students retrieved successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return createFailureResponse(res, 'Student not found');
        }
        createSuccessResponse(res, student, 'Student retrieved successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to update a student by ID
exports.updateStudentById = [
    // Add validation rules using express-validator
    body('name').notEmpty().isString(),
    body('gender').notEmpty().isString(),
    body('age').notEmpty().isInt({ min: 0 }),
    body('standard').notEmpty().isInt({ min: 1 }),
    body('caste').notEmpty().isString(),
    body('schoolId').notEmpty().isMongoId(),
    // Add more validation rules as needed

    // Call the validation middleware before handling the request
    validateStudent,

    async (req, res) => {
        try {
            const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedStudent) {
                return createFailureResponse(res, 'Student not found');
            }
            createSuccessResponse(res, updatedStudent, 'Student updated successfully');
        } catch (error) {
            createFailureResponse(res, error.message);
        }
    }
];

// Controller to delete a student by ID
exports.deleteStudentById = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return createFailureResponse(res, 'Student not found');
        }
        createSuccessResponse(res, deletedStudent, 'Student deleted successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};
