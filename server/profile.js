const MyProfile = require("./models/profile.js");

const createProfile = async (req, res) => {
  try {
    const {
      profileLogo,
      fullName,
      jobTitle,
      phone,
      email,
      website,
      currentSalary,
      expectedSalary,
      experience,
      gender,
      age,
      educationLevels,
      languages,
      skills,
      description,
      linkedin,
      country,
      city,
      completeAddress,
    } = req.body;

    // Check if all required fields are present
    const requiredFields = [
       'fullName', 'jobTitle', 'phone', 'email', 'experience',
      'gender', 'age', 'educationLevels', 'languages', 'description',
      'linkedin', 'country', 'city', 'completeAddress'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Create a new profile instance
    const newProfile = new MyProfile(req.body);

    // Save the profile to the database
    await newProfile.save();

    res.status(201).json({
      message: "Profile created successfully",
      profile: newProfile
    });
  } catch (error) {
    console.error("Error in createProfile:", error);

    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ error: `${field} already exists` });
    }

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createProfile };