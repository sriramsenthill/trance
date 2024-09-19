import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { Config } from "../../../config"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    // Make a POST request to the backend route for credential validation
                    const response = await axios.post(`${Config.BACKEND_URL}/signIn`, {
                        email,
                        password
                    });

                    const user = response.data;

                    // Check if user data is valid
                    if (!user) {
                        throw new Error("Invalid credentials");
                    }

                    // Return the user data
                    return user;
                } catch (error) {
                    console.error("Error during authorization:", error);
                    throw new Error("Authorization failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user; // Attach user info to token
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user; // Attach user info to session
            return session;
        },
    },
    session: {
        strategy: "jwt", // Use JWT for session management
    },
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env.local
    pages: {
        signIn: "/login", // Custom sign-in page path
    },
};

export default NextAuth(authOptions);