const JobApply = require("./models/apply");

const applyJob = async (req, res) => {
  try {
    const { userID, jobID } = req.body;

    // Check if all required fields are present
    if (!userID || !jobID) {
      return res.status(400).json({ error: "Both userID and jobID are required" });
    }

    // Validate that userID and jobID are numbers
    if (typeof userID !== 'number' || typeof jobID !== 'number') {
      return res.status(400).json({ error: "userID and jobID must be numbers" });
    }

    // Check if the user has already applied for this job
    const existingApplication = await JobApply.findOne({ userID, jobID });

    if (existingApplication) {
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    // Create a new job application instance
    const newJobApplication = new JobApply({
      userID,
      jobID,
      isApplied: true, // Set isApplied to true since the application is being submitted
    });

    // Save the job application to the database
    await newJobApplication.save();

    res.status(201).json({
      message: "Job application submitted successfully",
      application: newJobApplication,
    });
  } catch (error) {
    console.error("Error in applyForJob:", error);

    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    // Check for duplicate application
    if (error.code === 11000) {
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkApplied = async (req, res) => {
  try {
    const { userID, jobID } = req.body;

    // Check if all required fields are present
    if (!userID || !jobID) {
      return res.status(400).json({ error: "Both userID and jobID are required" });
    }

    // Validate that userID and jobID are numbers
    if (typeof userID !== 'number' || typeof jobID !== 'number') {
      return res.status(400).json({ error: "userID and jobID must be numbers" });
    }

    // Check if the user has already applied for this job
    const existingApplication = await JobApply.findOne({ userID, jobID });

    // Construct the response object
    const responseData = {
      isApplied: !!existingApplication // Set isApplied to true if an application exists
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error in checkApplied:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { applyJob, checkApplied };
