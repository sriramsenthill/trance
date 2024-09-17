// auth.js
const User = require("./models/user");
const Studentdata = require("./models/students");

const signInUser = async (req, res) => {
    try {
        const { REG_NO, email, password } = req.body;
        console.log(req.body);
        let user;

        if (!email && !password && REG_NO) {
            // If no email and password but registerNumber is provided, find user by registerNumber
            user = await Studentdata.findOne({ REG_NO });
        } else {
            // If email and password provided, find user by email
            user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the provided password matches the user's password
            if (password === user.password) {
                // Passwords match
                return res.json(user); // Send response here
            } else {
                // Passwords don't match
                return res.status(401).json({ message: "Invalid password" });
            }
        }

        // If registerNumber provided and user not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If registerNumber provided and user found
        res.json(user); // This line sends a response
    } catch (error) {
        console.error("Failed to sign in:", error);
        res.status(500).json({ message: "Failed to sign in" });
    }
}



module.exports = { signInUser };
