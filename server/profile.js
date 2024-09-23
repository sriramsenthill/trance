const MyProfile = require("./models/profile.js");

const createProfile = async (req, res) => {
  try {
    const {
      userID,
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

    // Check if the userID already exists
    const existingProfile = await MyProfile.findOne({ userID });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists for this userID" });
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

const getAllProfiles = async (req, res) => {
  try {
    // Retrieve all profiles from the database
    const profiles = await MyProfile.find({});

    // Check if there are no profiles found
    if (profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    // Send the retrieved profiles to the frontend
    res.status(200).json({
      message: "Profiles retrieved successfully",
      profiles: profiles,
    });
  } catch (error) {
    console.error("Error in getAllProfiles:", error);

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProfileByID = async (req, res) => {
  try {
    // Extract userID from request parameters
    const userID = parseInt(req.params.userID, 10); // Correctly access userID

    console.log(userID);

    if (isNaN(userID)) {
      return res.status(400).json({ error: 'Invalid userID format' });
    }

    // Find the profile by userID
    const profile = await MyProfile.findOne({ userID: userID });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile); // Send back the found profile

  } catch (error) {
    console.error("Error in getProfileByID:", error);

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = { createProfile, getAllProfiles, getProfileByID };