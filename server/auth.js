const User = require("./models/user");
const bcrypt = require("bcryptjs");


// Registration Handler
const registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;  // Destructure the role to determine if it's a candidate or employer

        // Check if the required fields are provided
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password, and role are required." });
        }

        // Check if the role is valid
        if (!['candidate', 'employer'].includes(role)) {
            return res.status(400).json({ message: "Invalid role provided. Must be 'candidate' or 'employer'." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
            role
        });

        // Save the user in the database
        await user.save();

        return res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully.` });

    } catch (error) {
        console.error("Failed to register:", error);
        res.status(500).json({ message: "Failed to register" });
    }
};

// Login Handler
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email in the User model
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return res.json({ message: "Login successful", user });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }

    } catch (error) {
        console.error("Failed to sign in:", error);
        res.status(500).json({ message: "Failed to sign in" });
    }
};

module.exports = { registerUser, signInUser };
