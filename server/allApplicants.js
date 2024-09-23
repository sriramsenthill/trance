const Job = require("./models/job"); // Import your Job model
const MyProfile = require("./models/profile"); // Import your Profile model

const getUserProfilesByJobId = async (req, res) => {
    try {
        const { jobId } = req.query;

        // Validate that jobId is provided
        if (!jobId) {
            return res.status(400).json({ error: "jobId is required" });
        }

        // Search for the job by jobId
        const job = await Job.findOne({ jobId });

        // Check if the job exists
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        // Extract userIDs from the job document
        const userIDs = job.userIDs;

        // If there are no userIDs, return an empty array
        if (userIDs.length === 0) {
            return res.status(200).json({ users: [] });
        }

        // Fetch user profiles based on userIDs
        const profiles = await MyProfile.find({ userID: { $in: userIDs } });

        // Return the profiles as JSON
        res.status(200).json({
            message: "User profiles retrieved successfully",
            users: profiles,
        });
    } catch (error) {
        console.error("Error in getUserProfilesByJobId:", error);

        // Handle generic errors
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getUserProfilesByJobId };
