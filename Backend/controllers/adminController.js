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
        const { emailUsr, usrPwd } = req.query;

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

const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.query;
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        return res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const updateFields = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateFields, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        return res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAdminById = async (req, res) => {
    try {
        const { adminId } = req.params;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        return res.status(200).json({ message: 'Admin fetched successfully', admin });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
    deleteAdmin,
    updateAdmin,
    getAdminById
};
