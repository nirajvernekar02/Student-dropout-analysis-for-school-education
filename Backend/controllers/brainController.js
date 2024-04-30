const fs = require('fs');
const path = require('path');
const brain = require('brain.js');
const csv = require('csv-parser');

const trainModel = async (trainingDataFiles) => {
  const trainingData = [];

  // Read and preprocess training data from CSV files
  for (const file of trainingDataFiles) {
    const filePath = path.join(__dirname, 'data', file);

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const inputData = {
            age: parseInt(row.age),
            standard: parseInt(row.standard),
            gender: row.gender,
            caste: row.caste,
            state: row.state,
            area: row.area,
            pincode: row.pincode,
            // Add more input parameters from the CSV file
          };

          const expectedFeedback = row.dropoutFeedback || '';

          trainingData.push({
            input: inputData,
            output: expectedFeedback,
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });
  }

  // Create and train the neural network model
  const net = new brain.recurrent.LSTM();
  net.train(trainingData, {
    iterations: 1000, // Number of training iterations
    log: true, // Log training progress
    // Add any other training options as needed
  });

  return net;
};

const generateFeedback = async (inputData, trainedModel) => {
  const feedback = trainedModel.run(inputData);
  return feedback;
};

// Usage example
const csvFiles = ['MOCK_DATA (1).csv'];

trainModel(csvFiles)
  .then((trainedModel) => {
    const inputData = {
      age: 15,
      standard: 10,
      gender: 'male',
      caste: 'general',
      state: 'Maharashtra',
      area: 'Mumbai',
      pincode: '400001',
      // Add more input parameters as needed
    };

    generateFeedback(inputData, trainedModel)
      .then((feedback) => {
        console.log('Generated feedback:', feedback);
      })
      .catch((error) => {
        console.error('Error generating feedback:', error);
      });
  })
  .catch((error) => {
    console.error('Error training model:', error);
  });