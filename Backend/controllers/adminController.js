const Admin = require('../models/adminmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to create a successful response
const createSuccessResponse = (res, data, message, token) => {
    const response = {
        status: 1,
        message: message || 'Success',
        data: data || {}
    };
    if (token) response.token = token;
    res.status(200).json(response);
};

// Function to create a failure response
const createFailureResponse = (res, errorMessage) => {
    res.status(500).json({
        status: 0,
        message: 'Failure',
        error: errorMessage,
    });
};

// Controller to register a new admin
const registerAdmin = async (req, res) => {
    try {
        const { empNo, usrName, emailUsr, usrNumb, usrPwd } = req.body;

        // Check if the email is already registered
        const existingAdmin = await Admin.findOne({ emailUsr });
        if (existingAdmin) {
            return createFailureResponse(res, 'Email already exists');
        }

        // Hash the password
        const hashedPwd = await bcrypt.hash(usrPwd, 10);

        // Create new admin
        const newAdmin = new Admin({
            empNo,
            usrName,
            emailUsr,
            usrNumb,
            usrPwd: hashedPwd
        });

        // Save admin to database
        const savedAdmin = await newAdmin.save();

        createSuccessResponse(res, savedAdmin, 'Admin registered successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to login an admin
const loginAdmin = async (req, res) => {
    try {
        const { emailUsr, usrPwd } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ emailUsr });

        if (!admin) {
            return createFailureResponse(res, 'Admin not found');
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(usrPwd, admin.usrPwd);
        if (!isPasswordValid) {
            return createFailureResponse(res, 'Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        createSuccessResponse(res, { admin, token }, 'Admin logged in successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        createSuccessResponse(res, admins, 'Admins fetched successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to delete an admin
const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        createSuccessResponse(res, deletedAdmin, 'Admin deleted successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

// Controller to update an admin
const updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const updateFields = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateFields, { new: true });
        createSuccessResponse(res, updatedAdmin, 'Admin updated successfully');
    } catch (error) {
        createFailureResponse(res, error.message);
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
    deleteAdmin,
    updateAdmin
};
