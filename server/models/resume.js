const mongoose = require("mongoose");

// Define the schema for User (Candidate or Employer)
const resumeschema = new mongoose.Schema({
    selectcv: {
        type: String,
    },
    desc: {
        type: String,
        required: true,
    },

    courseName: {
        type: [String],
        required: true,
    },
    collegeName:{
        type:[String],
        required:true,
    },
    educationPeriod: {
        type: [String],
        required: true,
    },
    educationdesc: {
        type: [String],
    },

    roleName: {
        type: [String],
    },
    companyName:{
        type:[String],
    },
    yearsofwork: {
        type: [String],
        required: true,
    },
    experiencedesc: {
        type: [String],
    },

    portfoliolink: {
        type: String,
        match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please enter a valid URL'],
    },
    
    awardname: {
        type:  [String],
    },
    dateofaward: {
        type: [String],
    },
    skills: {
        type: String,
    },

});

// Create the User model
const Resume = mongoose.model("Resume", resumeschema);

module.exports = Resume;
