const Student = require('../models/studentmodel');
const fs = require('fs');

const importStudents = async (req, res) => {
  try {
    // Extracting data from the request body
    const { schoolId } = req.body;

    // Check if schoolId is provided
    if (!schoolId) {
      return res.status(400).json({ error: 'schoolId is required' });
    }

    // Read the uploaded CSV file
    const csvData = fs.readFileSync(req.file.path, 'utf8').split('\n');

    // Prepare the array to store imported student data
    const studentData = [];

    // Assuming the first row contains column headers
    const headers = csvData[0].split(',');

    // Iterate over each row of the CSV data, starting from the second row
    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i].split(',');

      // Create student object by mapping each header to its corresponding value in the row
      const studentObj = {};
      for (let j = 0; j < headers.length; j++) {
        studentObj[headers[j]] = row[j];
      }

      // Add schoolId to the student object
      studentObj.schoolId = schoolId;

      // Push the student object to the studentData array
      studentData.push(studentObj);
    }

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