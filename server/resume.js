const Resume = require("./models/resume.js");

const createResume = async (req, res) => {
  try {
    const {
      selectcv,
      desc,
      courseName,
      collegeName,
      educationPeriod,
      educationdesc,
      roleName,
      companyName,
      yearsofwork,
      experiencedesc,
      portfoliolink,
      awardname,
      dateofaward,
      skills
    } = req.body;

    // Check if all required fields are present
    const requiredFields = [
      'desc', 'courseName', 'collegeName', 'educationPeriod', 'yearsofwork'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Create a new resume instance
    const newResume = new Resume(req.body);

    // Save the resume to the database
    await newResume.save();

    res.status(201).json({
      message: "Resume created successfully",
      resume: newResume
    });
  } catch (error) {
    console.error("Error in createResume:", error);

    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createResume };