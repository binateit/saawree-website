import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        token: string
        tokenExpiryTime: string
        refreshToken: string
        refreshTokenExpiryTime: Date
        firstName: string
        lastName: string
        emailAddress: string
        mobileNumber: string
        userType: string

    }

    interface token {
        user: User
    }

    interface Session {
        user: User & DefaultSession["user"]
    }


}