const Student = require('../models/studentmodel');
const School = require('../models/schoolmodel')

// Controller to calculate dropout ratio
exports.calculateDropoutRatio = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const dropoutStudents = await Student.countDocuments({ dropoutStatus: true });
        const dropoutRatio = (dropoutStudents / totalStudents) * 100;
        res.status(200).json({ success: true, dropoutRatio });
    } catch (error) {
        console.error('Error calculating dropout ratio:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller to find maximum dropout age
exports.findMaxDropoutAge = async (req, res) => {
    try {
        const maxDropoutAge = await Student.find({ dropoutStatus: true }).sort({ age: -1 }).limit(1);
        res.status(200).json({ success: true, maxDropoutAge });
    } catch (error) {
        console.error('Error finding maximum dropout age:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller to compare dropout ratio statewise
exports.compareDropoutRatioStatewise = async (req, res) => {
    try {
        const statewiseDropoutRatio = await Student.aggregate([
            {
                $lookup: {
                    from: 'schools',
                    localField: 'schoolId',
                    foreignField: '_id',
                    as: 'school'
                }
            },
            {
                $group: {
                    _id: '$school.location.state',
                    totalStudents: { $sum: 1 },
                    dropoutStudents: { $sum: { $cond: [{ $eq: ['$dropoutStatus', true] }, 1, 0] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    state: '$_id',
                    dropoutRatio: { $multiply: [{ $divide: ['$dropoutStudents', '$totalStudents'] }, 100] }
                }
            }
        ]);
        res.status(200).json({ success: true, statewiseDropoutRatio });
    } catch (error) {
        console.error('Error comparing dropout ratio statewise:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




//CL


// Function to get dropout ratio based on school
exports.getDropoutRatioBySchool = async (req, res) => {
    try {
      const schoolId = req.query.schoolId;
      const school = await School.findById(schoolId);
  
      if (!school) {
        return res.status(404).json({ error: 'School not found' });
      }
  
      const students = await Student.find({ schoolId });
      const dropoutStudents = students.filter(student => student.dropoutStatus);
      const dropoutRatio = dropoutStudents.length / students.length;
  
      res.status(200).json({ school, dropoutRatio });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Function to get dropout ratio based on area
  exports.getDropoutRatioByArea = async (req, res) => {
    try {
      const area = req.query.area;
      const schools = await School.find({ 'location.area': area });
  
      if (!schools.length) {
        return res.status(404).json({ error: 'No schools found in the specified area' });
      }
  
      const students = await Student.find({ schoolId: { $in: schools.map(school => school._id) } });
      const dropoutStudents = students.filter(student => student.dropoutStatus);
      const dropoutRatio = dropoutStudents.length / students.length;
  
      res.status(200).json({ area, dropoutRatio });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Function to get dropout ratio based on gender
  exports.getDropoutRatioByGender = async (req, res) => {
    try {
      const genderGroups = {};
      const students = await Student.find();
  
      students.forEach(student => {
        const gender = student.gender;
        const isDropout = student.dropoutStatus;
  
        if (!genderGroups[gender]) {
          genderGroups[gender] = { totalStudents: 0, dropoutStudents: 0 };
        }
  
        genderGroups[gender].totalStudents += 1;
  
        if (isDropout) {
          genderGroups[gender].dropoutStudents += 1;
        }
      });
  
      const genderData = Object.entries(genderGroups).map(([gender, { totalStudents, dropoutStudents }]) => ({
        gender,
        totalStudents,
        dropoutStudents,
        dropoutRatio: dropoutStudents / totalStudents,
      }));
  
      res.status(200).json({ genderData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Function to get dropout ratio based on caste
  exports.getDropoutRatioByCaste = async (req, res) => {
    try {
      const casteGroups = {};
      const students = await Student.find();
  
      students.forEach(student => {
        const caste = student.caste;
        const isDropout = student.dropoutStatus;
  
        if (!casteGroups[caste]) {
          casteGroups[caste] = { totalStudents: 0, dropoutStudents: 0 };
        }
  
        casteGroups[caste].totalStudents += 1;
  
        if (isDropout) {
          casteGroups[caste].dropoutStudents += 1;
        }
      });
  
      const casteData = Object.entries(casteGroups).map(([caste, { totalStudents, dropoutStudents }]) => ({
        caste,
        totalStudents,
        dropoutStudents,
        dropoutRatio: dropoutStudents / totalStudents,
      }));
  
      res.status(200).json({ casteData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Function to get dropout ratio based on age/standard
  exports.getDropoutRatioByAgeStandard = async (req, res) => {
    try {
      const ageStandardGroups = {};
      const students = await Student.find();
  
      students.forEach(student => {
        const age = student.age;
        const standard = student.standard;
        const ageStandard = `${age}-${standard}`;
        const isDropout = student.dropoutStatus;
  
        if (!ageStandardGroups[ageStandard]) {
          ageStandardGroups[ageStandard] = { totalStudents: 0, dropoutStudents: 0 };
        }
  
        ageStandardGroups[ageStandard].totalStudents += 1;
  
        if (isDropout) {
          ageStandardGroups[ageStandard].dropoutStudents += 1;
        }
      });
  
      const ageStandardData = Object.entries(ageStandardGroups).map(([ageStandard, { totalStudents, dropoutStudents }]) => ({
        ageStandard,
        totalStudents,
        dropoutStudents,
        dropoutRatio: dropoutStudents / totalStudents,
      }));
  
      res.status(200).json({ ageStandardData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  // Function to get the dropout ratio based on age
exports.getDropoutRatioByAge = async (req, res) => {
    try {
      const dropoutStudents = await Student.find({ dropoutStatus: true });
      const ageGroups = {};
  
      // Group students by age and count dropouts
      dropoutStudents.forEach((student) => {
        const age = student.age;
        ageGroups[age] = (ageGroups[age] || 0) + 1;
      });
  
      res.status(200).json({ ageGroups });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Function to get the dropout ratio based on location (state, area, pincode)
  exports.getDropoutRatioByLocation = async (req, res) => {
    try {
      const schools = await School.find({}, { location: 1, studentCount: 1 });
      const locationData = {};
  
      // Group schools by location and calculate dropout ratio
      schools.forEach((school) => {
        const { state, area, pincode } = school.location;
        const studentCount = school.studentCount;
  
        if (!locationData[state]) {
          locationData[state] = {};
        }
        if (!locationData[state][area]) {
          locationData[state][area] = {};
        }
        if (!locationData[state][area][pincode]) {
          locationData[state][area][pincode] = { studentCount: 0, dropoutCount: 0 };
        }
  
        locationData[state][area][pincode].studentCount += studentCount;
      });
  
      const dropoutStudents = await Student.find({ dropoutStatus: true });
      dropoutStudents.forEach((student) => {
        const schoolId = student.schoolId;
        const school = schools.find((s) => s._id.equals(schoolId));
  
        if (school) {
          const { state, area, pincode } = school.location;
          locationData[state][area][pincode].dropoutCount += 1;
        }
      });
  
      // Calculate dropout ratio for each location
      for (const state in locationData) {
        for (const area in locationData[state]) {
          for (const pincode in locationData[state][area]) {
            const { studentCount, dropoutCount } = locationData[state][area][pincode];
            locationData[state][area][pincode].dropoutRatio = dropoutCount / studentCount;
          }
        }
      }
  
      res.status(200).json({ locationData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };