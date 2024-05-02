const Student = require("../models/studentmodel");
const School = require("../models/schoolmodel");

// Controller to calculate dropout ratio
exports.calculateDropoutRatio = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const dropoutStudents = await Student.countDocuments({
      dropoutStatus: true,
    });
    const dropoutRatio = (dropoutStudents / totalStudents) * 100;
    res.status(200).json({ success: true, dropoutRatio });
  } catch (error) {
    console.error("Error calculating dropout ratio:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to find maximum dropout age
exports.findMaxDropoutAge = async (req, res) => {
  try {
    const maxDropoutAge = await Student.find({ dropoutStatus: true })
      .sort({ age: -1 })
      .limit(1);
    res.status(200).json({ success: true, maxDropoutAge });
  } catch (error) {
    console.error("Error finding maximum dropout age:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to compare dropout ratio statewise
exports.compareDropoutRatioStatewise = async (req, res) => {
  try {
    const statewiseDropoutRatio = await Student.aggregate([
      {
        $lookup: {
          from: "schools",
          localField: "schoolId",
          foreignField: "_id",
          as: "school",
        },
      },
      {
        $group: {
          _id: "$school.location.state",
          totalStudents: { $sum: 1 },
          dropoutStudents: {
            $sum: { $cond: [{ $eq: ["$dropoutStatus", true] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          state: "$_id",
          dropoutRatio: {
            $multiply: [
              { $divide: ["$dropoutStudents", "$totalStudents"] },
              100,
            ],
          },
        },
      },
    ]);
    res.status(200).json({ success: true, statewiseDropoutRatio });
  } catch (error) {
    console.error("Error comparing dropout ratio statewise:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//CL

// Function to get dropout ratio based on school
exports.getDropoutRatioBySchool = async (req, res) => {
  try {
    const schoolId = req.query.schoolId;

    // Find the school by ID
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }

    // Find all students belonging to the specified school
    const students = await Student.find({ schoolId });
    if (students.length === 0) {
      return res.status(200).json({ school, dropoutRatio: 0 });
    }

    // Calculate the number of dropout students
    const dropoutStudents = students.filter((student) => student.dropoutStatus);

    // Calculate the dropout ratio
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
    const schools = await School.find({ "location.area": area });

    if (!schools.length) {
      return res
        .status(404)
        .json({ error: "No schools found in the specified area" });
    }

    const students = await Student.find({
      schoolId: { $in: schools.map((school) => school._id) },
    });
    const dropoutStudents = students.filter((student) => student.dropoutStatus);
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

    students.forEach((student) => {
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

    const genderData = Object.entries(genderGroups).map(
      ([gender, { totalStudents, dropoutStudents }]) => ({
        gender,
        totalStudents,
        dropoutStudents,
        dropoutRatio: dropoutStudents / totalStudents,
      })
    );

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

    students.forEach((student) => {
      const caste = student.caste;
      const isDropout = student.dropoutStatus;

      if (!casteGroups[caste]) {
        casteGroups[caste] = { totalStudents: 0, dropoutStudents: 0 };
      }

      casteGroups[caste].totalStudents += 1;

      if (isDropout === true) {
        casteGroups[caste].dropoutStudents += 1;
      }
    });

    const casteData = Object.entries(casteGroups).map(
      ([caste, { totalStudents, dropoutStudents }]) => ({
        caste,
        totalStudents,
        dropoutStudents,
        dropoutRatio: dropoutStudents / totalStudents,
      })
    );

    res.status(200).json({ casteData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get dropout ratio based on age/standard
exports.getDropoutRatioByStandard = async (req, res) => {
  try {
    const standardGroups = {};
    const students = await Student.find();

    // Iterate through each student
    students.forEach((student) => {
      const standard = student.standard;
      const isDropout = student.dropoutStatus;

      // Initialize the group if it doesn't exist
      if (!standardGroups[standard]) {
        standardGroups[standard] = { totalStudents: 0, dropoutStudents: 0 };
      }

      // Increment total students count
      standardGroups[standard].totalStudents += 1;

      // Increment dropout students count if the student has dropped out
      if (isDropout) {
        standardGroups[standard].dropoutStudents += 1;
      }
    });

    // Calculate dropout ratio for each standard
    const standardData = Object.entries(standardGroups).map(
      ([standard, { totalStudents, dropoutStudents }]) => ({
        standard,
        totalStudents,
        dropoutStudents,
        dropoutRatio: totalStudents === 0 ? 0 : dropoutStudents / totalStudents,
      })
    );

    res.status(200).json({ standardData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDropoutRatioByAge = async (req, res) => {
  try {
    const ageGroups = {};
    const students = await Student.find();

    // Iterate through each student
    students.forEach((student) => {
      const ageGroup = Math.floor(student.age / 5) * 5; // Group age into intervals of 5
      const isDropout = student.dropoutStatus;

      // Create a key for the age group
      const ageKey = `${ageGroup}-${ageGroup + 4}`;

      // Initialize the group if it doesn't exist
      if (!ageGroups[ageKey]) {
        ageGroups[ageKey] = { totalStudents: 0, dropoutStudents: 0 };
      }

      // Increment total students count
      ageGroups[ageKey].totalStudents += 1;

      // Increment dropout students count if the student has dropped out
      if (isDropout) {
        ageGroups[ageKey].dropoutStudents += 1;
      }
    });

    // Calculate dropout ratio for each age group
    const ageData = Object.entries(ageGroups).map(
      ([ageKey, { totalStudents, dropoutStudents }]) => ({
        ageGroup: ageKey,
        totalStudents,
        dropoutStudents,
        dropoutRatio: totalStudents === 0 ? 0 : dropoutStudents / totalStudents,
      })
    );

    // Sort the ageData array by ageGroup
    ageData.sort((a, b) => {
      const ageGroupA = parseInt(a.ageGroup.split("-")[0]);
      const ageGroupB = parseInt(b.ageGroup.split("-")[0]);
      return ageGroupA - ageGroupB;
    });

    res.status(200).json({ ageData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDropoutRatioByLocation = async (req, res) => {
  try {
    const students = await Student.find();
    const locationData = {};

    // Group students by location and calculate dropout ratio
    for (const student of students) {
      const schoolId = student.schoolId;
      const school = await School.findById(schoolId);
      if (!school) continue; // Skip if school not found

      const { state, area, pincode } = school.location;
      const isDropout = student.dropoutStatus;

      // Initialize locationData if it doesn't exist
      locationData[state] = locationData[state] || {};
      locationData[state][area] = locationData[state][area] || {};
      locationData[state][area][pincode] = locationData[state][area][
        pincode
      ] || { studentCount: 0, dropoutCount: 0 };

      // Increment student count
      locationData[state][area][pincode].studentCount += 1;

      // Increment dropout count if student is a dropout
      if (isDropout) {
        locationData[state][area][pincode].dropoutCount += 1;
      }
    }

    // Calculate dropout ratio for each location
    for (const state in locationData) {
      for (const area in locationData[state]) {
        for (const pincode in locationData[state][area]) {
          const { studentCount, dropoutCount } =
            locationData[state][area][pincode];
          locationData[state][area][pincode].dropoutRatio =
            studentCount === 0 ? null : dropoutCount / studentCount;
        }
      }
    }

    res.status(200).json({ locationData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDropoutAnalysis = async (req, res) => {
  try {
    const filters = {};

    // Build filters based on query parameters
    if (req.query.state) {
      filters["schoolId.location.state"] = req.query.state;
    }
    if (req.query.location) {
      const [lng, lat] = req.query.location.split(",").map(Number);
      filters["schoolId.location.mapLocation"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        },
      };
    }
    if (req.query.gender) {
      filters.gender = req.query.gender;
    }
    if (req.query.age) {
      filters.age = req.query.age;
    }
    if (req.query.standard) {
      filters.standard = req.query.standard;
    }
    if (req.query.category) {
      filters.caste = req.query.category;
    }

    const students = await Student.find({ dropoutStatus: true, ...filters })
      .populate({
        path: "schoolId",
        select: "name location",
      })
      .select(
        "name gender age standard caste dropoutReason dropoutPrediction schoolId"
      );

    const populatedStudents = students.map((student) => {
      const schoolLocation = student.schoolId.location;
      return {
        ...student.toObject(),
        schoolLocation,
      };
    });

    res.json(populatedStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
