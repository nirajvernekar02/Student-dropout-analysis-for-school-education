const Student = require('../models/studentmodel');
const { validationResult } = require('express-validator');

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

// Controller to create a new student
exports.createStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        createSuccessResponse(res, newStudent, 'Student created successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

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
exports.updateStudentById = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return createFailureResponse(res, 'Student not found');
        }
        createSuccessResponse(res, updatedStudent, 'Student updated successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

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

// Filter Students

exports.filterStudents = async (req, res) => {
    try {
        // Extracting filter parameters from request query
        const { schoolId, area, gender, caste, age, standard } = req.query;

        // Constructing the filter object based on provided parameters
        const filter = {};
        if (schoolId) filter.schoolId = schoolId;
        if (area) filter.$or = [{ 'school.location.area': area }, { 'school.location.city': area }, { 'school.location.state': area }];
        if (gender) filter.gender = gender;
        if (caste) filter.caste = caste;
        if (age) filter.age = age;
        if (standard) filter.standard = standard;

        // Ensure that only indexed fields are used in sorting or filtering
        const indexedFields = ['schoolId', 'gender', 'caste', 'age', 'standard'];
        for (const key in filter) {
            if (!indexedFields.includes(key)) {
                return res.status(400).json({ error: `${key} is not an indexed field` });
            }
        }

        // Ensure efficient query execution by analyzing query plan
        const explainResult = await Student.find(filter).explain();

        // Performing the optimized query to find students based on the filter
        const students = await Student.find(filter).limit(100).lean(); // Limiting the number of documents returned

        // Sending the filtered student data as response
        res.status(200).json({ success: true, students });
    } catch (error) {
        console.error('Error filtering students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
