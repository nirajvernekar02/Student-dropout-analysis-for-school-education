const mongoose = require('mongoose');

// Define the schema for the user collection
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  pincode: {
    type: String
  },
  highestQualification: {
    type: String
  },
  profilePicture: {
    type: String 
  },
  timestamps: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
