const mongoose = require("mongoose");

// Define the schema for User (Candidate or Employer)
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['candidate', 'employer'], // Restrict role to either "candidate" or "employer"
        required: true,
    },
    userID: {
        type: Number,
        unique: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
