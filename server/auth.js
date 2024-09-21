const User = require("./models/user");
const bcrypt = require("bcryptjs");

// Initialize a single counter for user IDs
let lastUserId = 0;

// Registration Handler
const registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate input
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password, and role are required." });
        }

        if (!['candidate', 'employer'].includes(role)) {
            return res.status(400).json({ message: "Invalid role provided. Must be 'candidate' or 'employer'." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Increment and assign a new userID
        lastUserId += 1; // Increment the shared user ID counter

        const user = new User({
            email,
            password: hashedPassword,
            role,
            userID: lastUserId // Assign the new userID
        });

        // Save the user in the database
        await user.save();

        return res.status(201).json({
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully.`,
            userID: user.userID
        });

    } catch (error) {
        console.error("Failed to register:", error);
        res.status(500).json({ message: "Failed to register" });
    }
};

// Login Handler
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return res.json({ message: "Login successful", userID: user.userID }); // Send back the userID
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }

    } catch (error) {
        console.error("Failed to sign in:", error);
        res.status(500).json({ message: "Failed to sign in" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { userID, oldPassword, newPassword } = req.body;

        // Check if all required fields are provided
        if (!userID || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "User ID, old password, and new password are required." });
        }

        // Find the user by userID
        const user = await User.findOne({ userID });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare the old password with the hashed password in the database
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordValid) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({ message: "Password changed successfully." });

    } catch (error) {
        console.error("Failed to change password:", error);
        res.status(500).json({ message: "Failed to change password." });
    }
};

module.exports = { registerUser, signInUser, changePassword };

