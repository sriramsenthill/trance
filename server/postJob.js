const JobSchema = require("./models/job");

const postJob = async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      jobDesc,
      keyRes,
      skills,
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
      'companyName', 'jobTitle', 'jobDesc', 'keyRes', 'skills', 'email', 'username',
      'jobType', 'offeredSalary', 'careerLevel', 'experience', 'gender',
      'industry', 'qualification', 'appDeadLine', 'country', 'city', 'completeAddress'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Determine the next jobId
    const lastJob = await JobSchema.findOne().sort({ jobId: -1 }).exec();
    const nextJobId = lastJob && typeof lastJob.jobId === 'number' ? lastJob.jobId + 1 : 1;

    // Create a new job instance with the next jobId
    const newJob = new JobSchema({
      ...req.body,
      jobId: nextJobId, // Set the jobId here
      datePosted: new Date() // Set datePosted to current date
    });

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

const getJobById = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10); // Convert jobId to an integer

    // Check if jobId is a valid number
    if (isNaN(jobId)) {
      return res.status(400).json({ error: 'Invalid job ID format' });
    }

    // Find the job by its jobId instead of _id
    const job = await JobSchema.findOne({ jobId: jobId });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error in getJobById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    // Find all jobs
    const jobs = await JobSchema.find({});

    if (jobs.length === 0) {
      return res.status(404).json({ error: 'No jobs found' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { postJob, getJobById, getAllJobs };