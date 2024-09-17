const User = require("./models/user");


const registerUser = async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            // If the email already exists, return a 400 status with a custom error message
            return res.status(400).json({ error: "Email already exists" });
        }

        // Create a new user based on the request body
        const newUser = new User(req.body);

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Send the saved user as the response
        res.json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUsers = async (req, res) => {
    try {
        // Retrieve all users from the User collection
        const users = await User.find({});

        // Send the retrieved users as the response
        res.json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { registerUser, getUsers };
