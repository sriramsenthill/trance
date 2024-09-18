import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password, REG_NO } = credentials;

                try {
                    let requestData;
                    if (REG_NO) {
                        requestData = { REG_NO };
                    } else {
                        requestData = { email, password };
                    }

                    // Make a POST request to the backend route for credential validation
                    const response = await axios.post(process.env.SERVER_HOST + "/signIn", requestData);

                    const user = response.data;

                    if (!user) {
                        return null;
                    }

                    // Generate JWT token
                    const token = jwt.sign(
                        { userId: user._id, userEmail: user.email },
                        process.env.NEXTAUTH_SECRET, // Your JWT secret key
                        { expiresIn: '1h' } // Token expiration time
                    );

                    // Return the token along with the user data
                    return { ...user, token };
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
    },
};

export default NextAuth(authOptions);
