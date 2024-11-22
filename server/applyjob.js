const JobApply = require("./models/apply");
const Job = require("./models/job");
const axios = require('axios');

// Groq API configuration
const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Function to calculate similarity using Groq
async function calculateSimilarity(companyDescription, companyValue, userDescription, userValue) {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.1-70b-versatile",
        messages: [
          {
            role: "user",
            content: `rate the similarity in the range of 100 in rating between two JSON data. give above 90 if job title mathces and less if dont. The two fields are ${companyDescription}=${companyValue} and ${userDescription}=${userValue}. I want you to give me only the number and no other text.`
          }
        ],
        temperature: 1
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Trim the response to ensure it's clean and log it
    const match = response.data.choices[0].message.content.trim();
    

    // Return the response as a string
    return match;

  } catch (error) {
    console.error("Error calculating similarity:", error);
    return "error"; // Return "0" as a string in case of an error
  }
}


const applyJob = async (req, res) => {
  let newJobApplication;

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

    try {
      // Fetch user profile and job details
      const [userResponse, jobResponse] = await Promise.all([
        axios.get(`http://localhost:3000/profiles/${userID}`),
        axios.get(`http://localhost:3000/jobs/${jobID}`)
      ]);

      const userData = userResponse.data;
      const jobData = jobResponse.data;
      
      // Calculate similarity score
      const similarityScore = await calculateSimilarity(
        "company profile",
        jobData,
        "candidate profile",
        userData
      );

      // Check if the user has already applied for any jobs
      const existingApplication = await JobApply.findOne({ userID });

      if (existingApplication) {
        // Check if the user has already applied for the specific job
        const jobExists = existingApplication.jobIDs.find(job => job.jobId === jobID);

        if (jobExists) {
          return res.status(400).json({ error: "You have already applied for this job" });
        }

        // Append the new jobID object with similarity score
        existingApplication.jobIDs.push({
          jobId: jobID,
          isApplied: true,
          jobMatchingScore: similarityScore
        });
        await existingApplication.save();
        newJobApplication = existingApplication;
      } else {
        // Create a new job application with similarity score
        newJobApplication = new JobApply({
          userID,
          jobIDs: [{
            jobId: jobID,
            isApplied: true,
            jobMatchingScore: similarityScore
          }]
        });

        await newJobApplication.save();
      }

      // Update the job document with the new applicant
      const job = await Job.findOne({ jobId: jobID });
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      if (!job.userIDs.includes(userID)) {
        job.userIDs.push(userID);
        await job.save();
      }

      res.status(201).json({
        message: "Job application submitted successfully",
        application: newJobApplication,
        similarityScore
      });

    } catch (apiError) {
      console.error("Error in API calls:", apiError);
      return res.status(500).json({ 
        error: "Error processing application",
        details: apiError.message 
      });
    }

  } catch (error) {
    console.error("Error in applyJob:", error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    if (error.code === 11000) {
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Keep other existing functions unchanged
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

    // Check if the user has any applications
    const existingApplication = await JobApply.findOne({ userID });

    // Check if the application exists and if the specific jobId is in jobIDs
    const isApplied = existingApplication
      ? existingApplication.jobIDs.some(job => job.jobId === jobID && job.isApplied)
      : false;

    // Construct the response object
    const responseData = {
      isApplied // Set isApplied to true if an application exists for that jobId
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error in checkApplied:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const appliedJobs = async (req, res) => {
  try {
    const { userID } = req.query; // Retrieve userID from query parameters

    // Validate that userID is provided
    if (!userID) {
      return res.status(400).json({ error: "userID is required" });
    }



    // Fetch the job application for the given userID
    const application = await JobApply.findOne({ userID });

    // Check if the application exists
    if (!application || !application.jobIDs || application.jobIDs.length === 0) {
      return res.status(404).json({ message: "No applications found for this user" });
    }

    // Extract jobIDs from the application
    const jobIDs = application.jobIDs.map(job => job.jobId);

    // Fetch all jobs concurrently using Promise.all
    const foundJobs = await Promise.all(
      jobIDs.map(async (jobId) => await Job.findOne({ jobId }))
    );

    // Filter out any null results (jobs not found)
    const validJobs = foundJobs.filter(job => job !== null);

    // Check if any valid jobs were found
    if (validJobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for the applied job IDs" });
    }

    // Return the valid jobs as a JSON response
    res.status(200).json({
      message: "Applied jobs retrieved successfully",
      jobs: validJobs,
    });
  } catch (error) {
    console.error("Error in appliedJobs:", error);

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAppliedJobs = async (req, res) => {
  try {


    // Find the job applications for the user
    const applications = await JobApply.find({});

    if (!applications) {
      return res.status(404).json({ error: 'No job found' });
    }

    // Return all the data as JSON
    res.status(200).json(applications);

  } catch (error) {
    console.error("Error in getAppliedJobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const postJobScore = async (req, res) => {
  try {
    const { userID, jobIDs } = req.body;

    // Check if userID is present and jobIDs array is not empty
    if (!userID || !Array.isArray(jobIDs) || jobIDs.length === 0) {
      return res.status(400).json({ error: "userID and non-empty jobIDs array are required" });
    }

    // Validate each job application
    for (const job of jobIDs) {
      if (typeof job.jobId !== 'number' || typeof job.JobMatchingScore !== 'number') {
        return res.status(400).json({ error: "Each job must have a numeric jobId and JobMatchingScore" });
      }
    }

    // Check if an application for this user already exists
    let application = await JobApply.findOne({ userID });

    if (application) {
      // If application exists, update it
      application.jobIDs = application.jobIDs.concat(
        jobIDs.map(job => ({
          jobId: job.jobId,
          jobMatchingScore: job.JobMatchingScore
        }))
      );
    } else {
      // If application doesn't exist, create a new one
      application = new JobApplicationSchema({
        userID,
        jobIDs: jobIDs.map(job => ({
          jobId: job.jobId,
          jobMatchingScore: job.JobMatchingScore,
          isApplied: true
        }))
      });
    }

    // Save the application to the database
    await application.save();

    res.status(201).json({
      message: "Job applications submitted successfully",
      application: application
    });
  } catch (error) {
    console.error("Error in postJobApplications:", error);

    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    // Generic error handler
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchJobApplicationStatistics = async (req, res) => {
    try {
        // Count total number of job application documents
        const totalApplicationDocuments = await JobApply.countDocuments();

        // Count total number of unique users who have applied for jobs
        const uniqueApplicants = await JobApply.distinct('userID').countDocuments();

        // Count total number of job applications (sum of all jobIDs arrays)
        const totalJobApplications = await JobApply.aggregate([
            { $unwind: "$jobIDs" },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]);

        // Count applications in the last 30 days
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const recentApplications = await JobApply.countDocuments({ 
            createdAt: { $gte: thirtyDaysAgo } 
        });

        // Get average job matching score
        const averageMatchingScore = await JobApply.aggregate([
            { $unwind: "$jobIDs" },
            { $group: { _id: null, avgScore: { $avg: "$jobIDs.jobMatchingScore" } } }
        ]);

        res.status(200).json({
            message: "Job application statistics fetched successfully",
            totalApplicationDocuments,
            uniqueApplicants,
            totalJobApplications: totalJobApplications[0]?.count || 0,
            recentApplications,
            averageMatchingScore: averageMatchingScore[0]?.avgScore || 0
        });
    } catch (error) {
        console.error("Error in fetchJobApplicationStatistics:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = {
  applyJob,
  checkApplied,
  appliedJobs,
  getAppliedJobs,
  postJobScore,
  fetchJobApplicationStatistics
};