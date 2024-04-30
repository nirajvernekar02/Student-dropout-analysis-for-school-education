const csv = require('csvtojson');
const School = require('../models/schoolmodel');

const importSchools = async (req, res) => {
  try {
    // Read the uploaded CSV file and parse it into JSON
    const schoolData = await csv().fromFile(req.file.path);

    // Map CSV data to match the school schema
    const mappedSchoolData = schoolData.map(school => ({
      name: school.Name,
      location: {
        area: school.Area,
        city: school.City,
        state: school.State,
        pincode: school.Pincode,
        mapLocation: {
          type: 'Point',
          coordinates: [parseFloat(school.Longitude), parseFloat(school.Latitude)]
        }
      },
      type: school.Type,
      studentCount: parseInt(school.StudentCount),
      dropoutPrediction: parseInt(school.DropoutPrediction),
      dropoutFeedback: school.DropoutFeedback
    }));

    // Insert all the school data into the database
    await School.insertMany(mappedSchoolData);

    // Send success response
    res.status(200).json({ success: true, message: 'Schools imported successfully' });
  } catch (error) {
    console.error('Error importing schools:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  importSchools,
};
