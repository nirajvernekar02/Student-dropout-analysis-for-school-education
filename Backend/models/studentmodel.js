const mongoose = require('mongoose');

// Define the schema for the student collection
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date
  },
  age: {
    type: Number
  },
  standard: {
    type: Number,
    required: true
  },
  caste: {
    type: String
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School' 
  },
  dropoutStatus: {
    type: Boolean,
    default: false
  },
  dropoutReason: {
    type: String
  },
  dropoutPrediction: {
    type: Number
  },
  dropoutFeedback: {
    type: String
  },
  schoolJoiningDate: {
    type: Date
  },
  streamAfter10th: {
    type: String
  },
  dateLeftSchool: {
    type: Date
  },

},{
    timestamps:true
},
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
