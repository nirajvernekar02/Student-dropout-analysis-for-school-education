const User = require('../models/usermodel');

// Controller for user registration
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, mobileNo, password, city, pincode, highestQualification } = req.body;
    const user = new User({ fullName, email, mobileNo, password, city, pincode, highestQualification });
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
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
