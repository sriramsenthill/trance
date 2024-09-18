// middleware.js
import { default as NextAuthMiddleware } from "next-auth/middleware";

export const config = {
    matcher: [
        "/employers-dashboard/dashboard/",
        "/employers-dashboard/post-jobs",
        "/candidates-dashboard/dashboard/",
    ],
};

export default NextAuthMiddleware;