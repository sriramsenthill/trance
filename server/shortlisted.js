const shortlistedSchema = require("./models/shortlisted");
const Job = require("./models/job"); // Import the Job model

const postShortlisted = async (req, res) => {
  try {
    const { userID, jobId } = req.body;
    console.log(userID);

    // Check if all required fields are present
    const requiredFields = ['userID', 'jobId'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Create a new shortlisted instance
    const newShortlisted = new shortlistedSchema({
      userID,
      jobId,
      dateShortlisted: new Date() // Set dateShortlisted to current date
    });

    // Save the shortlisted entry to the database
    await newShortlisted.save();

    // Find the job by jobId and update its shortlisted array
    const job = await Job.findOne({ jobId: jobId });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Append userID to the shortlisted array and set isShortlisted to true
    job.shortlisted.push({
      userID,
      isShortlisted: true
    });

    // Save the updated job document
    await job.save();

    res.status(201).json({
      message: "Job shortlisted successfully",
      shortlisted: newShortlisted
    });
  } catch (error) {
    console.error("Error in postShortlisted:", error);

    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTotalShortlistedApplicants = async (req, res) => {
  try {
    // Count the total shortlisted applicants
    const totalShortlisted = await shortlistedSchema.countDocuments();

    res.status(200).json({
      totalShortlisted
    });
  } catch (error) {
    console.error("Error in getTotalShortlistedApplicants:", error);
    
    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

const getJobsForUser = async (req, res) => {
  try {
    const { userID } = req.query;

    // Validate userID
    if (!userID) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch all job IDs for the given userID
    const shortlistedJobs = await shortlistedSchema.find({ userID }).lean();
    
    // Check if there are any shortlisted jobs
    if (!shortlistedJobs.length) {
      return res.status(404).json({ message: "No shortlisted jobs found for this user" });
    }

    // Extract job IDs
    const jobIds = shortlistedJobs.map(job => job.jobId);
    
    // Fetch job details for the extracted job IDs
    const jobsDetails = await Job.find({ jobId: { $in: jobIds } }).lean();

    // Check if any job details were found
    if (!jobsDetails.length) {
      return res.status(404).json({ message: "No jobs found for this user" });
    }

    // Return the job details
    res.status(200).json({
      userID,
      jobs: jobsDetails
    });
  } catch (error) {
    console.error("Error in getJobsForUser:", error);
    
    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { postShortlisted, getTotalShortlistedApplicants, getJobsForUser };


