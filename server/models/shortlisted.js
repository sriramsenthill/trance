const mongoose = require("mongoose");

const shortlist = new mongoose.Schema({
    userID: {
        type: Number,
    },
    jobId: {
        type: Number,
    },
    dateShortlisted: {
        type: Date,
    }
    
});

const shortlisted = mongoose.model("ShortlistedCandidate", shortlist);

module.exports = shortlisted;