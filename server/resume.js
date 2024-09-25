const Resume = require("./models/resume.js");

const createResume = async (req, res) => {
  try {
    const {
      userID,
      selectcv,
      desc,
      education, // Expecting an array of education objects
      workExperience, // Expecting an array of work experience objects
      portfoliolink,
      skills,
    } = req.body;

    // Check if all required fields are present
    const requiredFields = ['desc', 'education', 'workExperience'];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Validate education entries
    for (const edu of education) {
      const { instituteName, courseName, instituteStart, instituteEnd } = edu;
      if (!instituteName || !courseName || !instituteStart || !instituteEnd) {
        return res.status(400).json({ error: "All fields in education are required" });
      }
    }

    // Validate work experience entries
    for (const work of workExperience) {
      const { jobRole, companyName, workStart, workEnd, YOE } = work;
      if (!jobRole || !companyName || !workStart || !workEnd || YOE === undefined) {
        return res.status(400).json({ error: "All fields in work experience are required" });
      }
    }

    // Check if a resume already exists for this userID
    const existingResume = await Resume.findOne({ userID });
    if (existingResume) {
      return res.status(400).json({ error: "A resume has already been created for this userID" });
    }

    // Create a new resume instance
    const newResume = new Resume({
      userID,
      selectcv,
      desc,
      education,
      workExperience,
      portfoliolink,
      skills,
    });

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


// Function to get work experience and education from the resume
const getResumeDetails = async (req, res) => {
  try {
    const userID = parseInt(req.params.userID, 10); // Convert jobId to an integer
    console.log(userID);
    // Find the resume by ID
    const resume = await Resume.findOne({ userID: userID });

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    // Extract relevant details
    const { selectcv, desc, portfoliolink, skills, education, workExperience } = resume;

    res.status(201).json({
      message: "Resume details retrieved successfully",
      education,
      workExperience,
      selectcv,
      desc,
      portfoliolink,
      skills
    });
  } catch (error) {
    console.error("Error in getResumeDetails:", error);

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createResume, getResumeDetails };