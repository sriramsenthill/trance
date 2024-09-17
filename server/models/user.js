const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    number: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        required: true,
    },
    REG_NO: {
        type: String,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;