const mongoose = require("mongoose");

// Define the schema for User (Candidate or Employer)
const resumeschema = new mongoose.Schema({
    userID: {
        type: Number,
        unique: true,
    },
    selectcv: {
        type: String,
    },
    desc: {
        type: String,
        required: true,
    },

    // Education array with five fields
    education: [{
        instituteName: {
            type: String,
            required: true,
        },
        courseName: {
            type: String,
            required: true,
        },
        educationDesc: {
            type: String,
        },
        instituteStart: {
            type: String, // Using Date type for better date handling
            required: true,
        },
        instituteEnd: {
            type: String, // Using Date type for better date handling
            required: true,
        },
    }],

    // Work Experience array with six fields
    workExperience: [{
        jobRole: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        experiencedesc: {
            type: String,
        },
        workStart: {
            type: String, // Using Date type for better date handling
            required: true,
        },
        workEnd: {
            type: String, // Using Date type for better date handling
            required: true,
        },
        YOE: { // Years of Experience
            type: Number, // Assuming this is a numeric value
            required: true,
        },
    }],

    portfoliolink: {
        type: String,
    },

    skills: {
        type: String, // Changed to an array to accommodate multiple skills
    },
});

// Create the User model
const Resume = mongoose.model("Resume", resumeschema);

module.exports = Resume;