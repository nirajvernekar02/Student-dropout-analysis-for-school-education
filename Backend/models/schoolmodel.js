const mongoose = require('mongoose');

// Define the schema for the school collection
const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    area: String,
    city: String,
    state: String,
    pincode: String,
    mapLocation: { 
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [Number] 
    }
  },
  type: {
    type: String,
    enum: ['government', 'private'] 
  },
  studentCount: {
    type: Number,
    default: 0
  },
  dropoutPrediction: {
    type: Number
  },
  dropoutFeedback: {
    type: String
  }
});

// Index for mapLocation field
schoolSchema.index({ 'location.mapLocation': '2dsphere' });

// Create the School model
const School = mongoose.model('School', schoolSchema);

module.exports = School;
