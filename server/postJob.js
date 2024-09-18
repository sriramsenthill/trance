const JobSchema = require("./models/job");

const postJob = async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      jobDesc,
      keyRes,
      email,
      username,
      jobType,
      offeredSalary,
      careerLevel,
      experience,
      gender,
      industry,
      qualification,
      AppDeadLine,
      country,
      city,
      completeAddress
    } = req.body;

    // Check if all required fields are present
    const requiredFields = [
      'companyName', 'jobTitle', 'jobDesc', 'keyRes', 'email', 'username',
      'jobType', 'offeredSalary', 'careerLevel', 'experience', 'gender',
      'industry', 'qualification', 'appDeadLine', 'country', 'city', 'completeAddress'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Create a new job instance
    const newJob = new JobSchema(req.body);

    // Save the job to the database
    await newJob.save();

    res.status(201).json({
      message: "Job posted successfully",
      job: newJob
    });
  } catch (error) {
    console.error("Error in postJob:", error);

    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { postJob };