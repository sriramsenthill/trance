const mongoose = require("mongoose");

// Define the schema for User (Candidate or Employer)
const applyJob = new mongoose.Schema({
    userID: {
        type: Number,
    },
    jobID: {
        type: Number,

    },
});

// Create the User model
const jobApply = mongoose.model("jobapply", applyJob);

module.exports = jobApply;
