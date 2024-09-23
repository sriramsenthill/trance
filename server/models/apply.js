const mongoose = require("mongoose");

// Define the schema for User (Candidate or Employer)
const apply = new mongoose.Schema({
    userID: {
        type: Number,
    },
    jobID: {
        type: Number,
    },
    isApplied: {
        type: Boolean,
    }
});

// Create the User model
const jobApply = mongoose.model("jobapply", apply);

module.exports = jobApply;
