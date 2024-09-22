const mongoose = require("mongoose");

const myProfileSchema = new mongoose.Schema({
    userID: {
        type: Number,
        unique: true,
    },
    profileLogo: {
        type: String,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    website: {
        type: String,
        trim: true,
    },
    currentSalary: {
        type: String,
    },
    expectedSalary: {
        type: String,
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
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    educationLevels: {
        type: String,
        required: true,
    },
    languages: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },

    linkedin: {
        type: String,
        required: true,
        trim: true,
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

const MyProfile = mongoose.model("MyProfile", myProfileSchema);

module.exports = MyProfile;