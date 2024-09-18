const mongoose = require("mongoose");

// Define the schema for User (Candidate or Employer)
const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobDesc: {
        type: String,
        required: true,
    },
    keyRes: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    jobType: {
        type: String,
        required: true,
        trim: true,
    },
    offeredSalary: {
        type: String,
        required: true,
        trim: true,
    },
    careerLevel: {
        type: String,
        required: true,
        trim: true,
    },
    experience: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    appDeadLine: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    completeAddress: {
        type: String,
        required: true,
        trim: true,
    },

});

// Create the User model
const JobSchema = mongoose.model("JobSchema", jobSchema);

module.exports = JobSchema;
