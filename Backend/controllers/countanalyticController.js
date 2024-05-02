const School = require('../models/schoolmodel');
const Student = require('../models/studentmodel');

exports.getSchoolCounts = async (req, res) => {
    try {
      // Get total school counts
      const totalSchools = await School.countDocuments();
  
      // Get total student count
      const totalStudents = await Student.countDocuments();
  
      const totaldropout = await Student.countDocuments({dropoutStatus:true});

      const AverageDropout = float((totaldropout/totalStudents)*100)
      res.status(200).json({
        totalSchool:totalSchools,
        totalStudents:totalStudents,
        totalDropout:totaldropout,
        AverageDropout:AverageDropout
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
  