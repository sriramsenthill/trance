const mongoose = require("mongoose");

const reject = new mongoose.Schema({
    userID: {
        type: Number,
    },
    jobId: {
        type: Number,
    }

});

const rejected = mongoose.model("RejectedCandidate", reject);

module.exports = rejected;