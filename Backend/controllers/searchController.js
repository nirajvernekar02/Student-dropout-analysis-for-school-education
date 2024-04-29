const School = require('../models/schoolmodel');
const Student = require('../models/studentmodel');

// Controller to search students
exports.searchStudents = async (req, res) => {
  try {
    const query = req.query;

    // Construct the filter object based on query parameters
    const filter = {};
    if (query.name) filter.name = { $regex: new RegExp(query.name, 'i') };
    if (query.gender) filter.gender = query.gender.toLowerCase();
    if (query.age) filter.age = parseInt(query.age);
    if (query.standard) filter.standard = parseInt(query.standard);
    if (query.caste) filter.caste = { $regex: new RegExp(query.caste, 'i') };
    if (query.schoolId) filter.schoolId = query.schoolId;
    if (query.dropoutStatus) filter.dropoutStatus = query.dropoutStatus === 'true';
    if (query.dropoutReason) filter.dropoutReason = { $regex: new RegExp(query.dropoutReason, 'i') };
    if (query.dropoutPrediction) filter.dropoutPrediction = parseInt(query.dropoutPrediction);
    if (query.dropoutFeedback) filter.dropoutFeedback = { $regex: new RegExp(query.dropoutFeedback, 'i') };

    // Search for students based on the filter
    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Controller to search schools
exports.searchSchools = async (req, res) => {
  try {
    const query = req.query;

    // Construct the filter object based on query parameters
    const filter = {};
    if (query.name) filter.name = { $regex: new RegExp(query.name, 'i') };
    if (query.location) {
      const locationQuery = query.location.toLowerCase();
      filter['location.area'] = { $regex: new RegExp(locationQuery, 'i') };
      filter['location.city'] = { $regex: new RegExp(locationQuery, 'i') };
      filter['location.state'] = { $regex: new RegExp(locationQuery, 'i') };
      filter['location.pincode'] = { $regex: new RegExp(locationQuery, 'i') };
    }
    if (query.type) filter.type = query.type.toLowerCase();
    if (query.studentCount) filter.studentCount = parseInt(query.studentCount);
    if (query.dropoutPrediction) filter.dropoutPrediction = parseInt(query.dropoutPrediction);
    if (query.dropoutFeedback) filter.dropoutFeedback = { $regex: new RegExp(query.dropoutFeedback, 'i') };

    // Search for schools based on the filter
    const schools = await School.find(filter);
    res.json(schools);
  } catch (error) {
    console.error('Error searching schools:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};