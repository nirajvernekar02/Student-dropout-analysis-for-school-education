const csv = require('csvtojson');
const Student = require('../models/studentmodel')
const importStudents = async (req, res) => {
  try {
    // Extracting data from the request body
    const { schoolId } = req.body;

    // Check if schoolId is provided
    if (!schoolId) {
      return res.status(400).json({ error: 'schoolId is required' });
    }

    // Read the uploaded CSV file and parse it into JSON
    const studentData = await csv().fromFile(req.file.path);

    // Add schoolId to each student object
    studentData.forEach(student => {
      student.schoolId = schoolId;
    });

    // Insert all the student data into the database
    await Student.insertMany(studentData);

    // Send success response
    res.status(200).json({ success: true, message: 'Students imported successfully' });
  } catch (error) {
    console.error('Error importing students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  importStudents,
};
