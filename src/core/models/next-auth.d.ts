import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  /**
   * User model returned by `useSession`, `getSession`, and JWT callbacks.
   */
  interface User {
    id?: string;
    token: string;
    tokenExpiryTime: Date;
    refreshToken: string;
    refreshTokenExpiryTime: Date;
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobileNumber: string;
    userType: string;
    agentCode?: string; // Optional for agent users
    isMakeToOrderEnabled?: boolean;
  }

  /**
   * Extend NextAuth's default Session type.
   */
  interface Session extends DefaultSession {
    user?: User; // Ensure user is included in the session
  }

  /**
   * Extend NextAuth's default JWT type.
   */
  interface JWT extends DefaultJWT {
    user?: User; // ✅ Store all user-related properties here
  }
}
