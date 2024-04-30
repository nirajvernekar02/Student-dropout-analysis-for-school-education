const csv = require('csvtojson');
const Student = require('../models/studentmodel');

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

    // Map CSV data to match the new schema
    const mappedStudentData = studentData.map(student => ({
      name: student.Name,
      gender: student.Gender,
      age: parseInt(student.Age),
      standard: parseInt(student.Standard),
      caste: student.Caste,
      schoolId: schoolId,
      dropoutStatus: false, // Assuming all imported students are not dropouts initially
      dropoutReason: '',
      dropoutPrediction: null,
      dropoutFeedback: '',
      dob: student.DOB,
      schoolJoiningDate: student.School_Joining_Date,
      streamAfter10th: student.Stream_After_10th,
      joinedSchoolDate: student.Joined_School_Date,
      leftSchoolDate: student.Left_School_Date
    }));

    // Insert all the student data into the database
    await Student.insertMany(mappedStudentData);

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
