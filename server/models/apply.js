const mongoose = require("mongoose");

// Define the schema for Job Applications
const jobApplicationSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: [true, "User ID is required"], // Make userID required
    },
    jobIDs: [{
        jobId: {
            type: Number,
            required: [true, "Job ID is required"], // Make jobId required
        },
        isApplied: {
            type: Boolean,
            default: true, // Default to true when a job is applied for
        },
        jobMatchingScore: {
            type: Number,
        }
    }],
}, { timestamps: true }); // Enable createdAt and updatedAt timestamps

// Create the Job Application model
const jobApply = mongoose.model("jobapply", jobApplicationSchema);

module.exports = jobApply;