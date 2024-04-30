const School = require('../models/schoolmodel');
const Student = require('../models/studentmodel');

exports.getSchoolCounts = async (req, res) => {
    try {
      // Get total school counts
      const totalSchools = await School.countDocuments();
  
      // Get total student count
      const totalStudents = await Student.countDocuments();
  
      res.status(200).json({
        totalSchools,
        totalStudents
      });
    } catch (error) {
      console.error('Error getting school counts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.getTotalStudentsInSchool = async (req, res) => {
    try {
      const schoolId = req.params.schoolId;
  
      // Get total students in the specified school
      const totalStudentsInSchool = await Student.countDocuments({ schoolId });
  
      res.status(200).json({
        totalStudentsInSchool
      });
    } catch (error) {
      console.error('Error getting total students in the school:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  