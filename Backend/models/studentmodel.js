const mongoose = require('mongoose');

// Define the schema for the student collection
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  age: {
    type: Number,
    required: true
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
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
