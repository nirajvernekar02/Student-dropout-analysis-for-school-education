const User = require('../models/usermodel');
const bcrypt = require('bcrypt');

// Controller for user registration
exports.registerUser = async (req, res) => {
    try {
      const { fullName, email, mobileNo, password, city, pincode, highestQualification } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with hashed password
      const user = new User({ fullName, email, mobileNo, password: hashedPassword, city, pincode, highestQualification });
      
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Controller for user login
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
  
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare hashed password with provided password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If passwords don't match, return error
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Passwords match, user logged in successfully
      res.status(200).json({ success: true, message: 'User logged in successfully' });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Controller for updating user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateFields = req.body;
    await User.findByIdAndUpdate(userId, updateFields);
    res.status(200).json({ success: true, message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for deleting user account
exports.deleteUserAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for uploading profile picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const profilePicturePath = req.file.path;
    await User.findByIdAndUpdate(userId, { profilePicture: profilePicturePath });
    res.status(200).json({ success: true, message: 'Profile picture uploaded successfully', profilePicturePath });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
