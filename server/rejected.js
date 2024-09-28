const Rejected = require("./models/rejected");
const Job = require("./models/job"); // Import the Job model


const postRejected = async (req, res) => {
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
        const newRejected = new Rejected({
            userID,
            jobId,
            dateShortlisted: new Date() // Set dateShortlisted to current date
        });

        // Save the shortlisted entry to the database
        await newRejected.save();

        // Find the job by jobId and update its shortlisted array
        const job = await Job.findOne({ jobId: jobId });

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // Append userID to the shortlisted array and set isShortlisted to true
        job.rejected.push({
            userID,
            isRejected: true
        });

        // Save the updated job document
        await job.save();

        res.status(201).json({
            message: "Job rejected successfully",
            rejected: newRejected
        });
    } catch (error) {
        console.error("Error in postRejeceted:", error);

        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors });
        }

        // Generic error handler
        res.status(500).json({ error: "Internal server error" });
    }
};

const fetchTotalRejectedJobs = async (req, res) => {
    try {
        // Count the total number of rejected jobs
        const totalRejectedJobs = await Rejected.countDocuments();

        // Count the number of unique job IDs
        const uniqueRejectedJobs = await Rejected.distinct('jobId').countDocuments();

        // Count the number of unique users who have rejected jobs
        const uniqueUsers = await Rejected.distinct('userID').countDocuments();

        res.status(200).json({
            message: "Total rejected jobs fetched successfully",
            totalRejections: totalRejectedJobs,
            uniqueRejectedJobs: uniqueRejectedJobs,
            uniqueUsers: uniqueUsers
        });
    } catch (error) {
        console.error("Error in fetchTotalRejectedJobs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { postRejected, fetchTotalRejectedJobs };  
