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

        // Filter out userIDs that are already in the shortlisted or rejected arrays
        const remainingUserIDs = userIDs.filter(userId => {
            const isShortlisted = job.shortlisted.some(shortlisted => shortlisted.userID === userId);
            const isRejected = job.rejected.some(rejected => rejected.userID === userId);
            return !isShortlisted && !isRejected;
        });

        // Fetch user profiles based on the remaining userIDs
        const profiles = await MyProfile.find({ userID: { $in: remainingUserIDs } });

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


const getShortlistedUserProfilesByJobId = async (req, res) => {
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

        // Extract shortlisted userIDs from the job document
        const shortlistedUsers = job.shortlisted;

        // If there are no shortlisted users, return an empty array
        if (shortlistedUsers.length === 0) {
            return res.status(200).json({ users: [] });
        }

        // Extract userIDs from the shortlisted array
        const shortlistedUserIDs = shortlistedUsers.map(shortlisted => shortlisted.userID);

        // Fetch user profiles based on the shortlisted userIDs
        const profiles = await MyProfile.find({ userID: { $in: shortlistedUserIDs } });

        // Return the profiles as JSON
        res.status(200).json({
            message: "Shortlisted user profiles retrieved successfully",
            users: profiles,
        });
    } catch (error) {
        console.error("Error in getShortlistedUserProfilesByJobId:", error);

        // Handle generic errors
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllUserProfiles = async (req,res) => {
    try {
        // Fetch all userIDs from the Job collection
        const allJobs = await Job.find({}, 'userIDs');
        const allUserIDs = [...new Set(allJobs.flatMap(job => job.userIDs))];

        // Fetch profiles for all userIDs
        const profiles = await MyProfile.find({ userID: { $in: allUserIDs } });
        
              // Return the profiles as JSON
              res.status(201).json({
                message: "Shortlisted user profiles retrieved successfully",
                users: profiles,
            });

    } catch (error) {
        console.error("Error in getAllUserProfiles:", error);
        throw error;
    }
};


module.exports = { getUserProfilesByJobId, getShortlistedUserProfilesByJobId, getAllUserProfiles };