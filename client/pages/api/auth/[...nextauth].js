import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { Config } from "../../../config";

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
                    const response = await axios.post(`${Config.BACKEND_URL}/signIn`, {
                        email,
                        password
                    });

                    const user = response.data;

                    // Check if user data is valid
                    if (!user || !user.userID) {
                        throw new Error("Invalid credentials");
                    }

                    return user; // Ensure this includes userID in the returned object
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
                token.userID = user.userID; // Attach userID to token
            }
            return token;
        },
        async session({ session, token }) {
            session.user.userID = token.userID; // Attach userID to session
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