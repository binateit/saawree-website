import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import jwt from "jsonwebtoken";
import { RefreshToken } from "@/core/models/authModel";
import {
  agentLogin,
  getAgentRefreshToken,
  getRefreshToken,
  login,
} from "@/core/requests/authRequests";
import { redirect } from "next/navigation";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "sign-with-email",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const loginResponse = await login(
            credentials.username,
            credentials.password
          );
          if (loginResponse.succeeded && loginResponse.data.token) {
            return {
              id: "user-" + loginResponse.data.emailAddress, // Ensure 'id' exists
              token: loginResponse.data.token,
              tokenExpiryTime: loginResponse.data.tokenExpiryTime,
              refreshToken: loginResponse.data.refreshToken,
              refreshTokenExpiryTime: new Date(
                loginResponse.data.refreshTokenExpiryTime
              ), // Ensure Date type
              firstName: loginResponse.data.firstName,
              lastName: loginResponse.data.lastName,
              emailAddress: loginResponse.data.emailAddress,
              mobileNumber: loginResponse.data.mobileNumber,
              userType: "customer",
            };
          } else {
            throw new Error("Invalid Credentials");
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "agent-sign-with-email",
      name: "Agent Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const loginResponse = await agentLogin(
            credentials.username,
            credentials.password
          );
          if (loginResponse?.data?.token) {
            return {
              id: "agent-" + loginResponse.data.emailAddress, // Ensure 'id' exists
              token: loginResponse.data.token,
              tokenExpiryTime: new Date(loginResponse.data.tokenExpiryTime),
              refreshToken: loginResponse.data.refreshToken,
              refreshTokenExpiryTime: new Date(
                loginResponse.data.refreshTokenExpiryTime
              ), // Ensure Date type
              firstName: loginResponse.data.firstName,
              lastName: loginResponse.data.lastName,
              emailAddress: loginResponse.data.emailAddress,
              mobileNumber: loginResponse.data.mobileNumber,
              userType: "agent",
              agentCode: loginResponse.data.agentCode, // Ensure agentCode exists for agents
            };
          } else {
            throw new Error("Invalid Credentials");
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET, // Add this line
  session: {
    strategy: "jwt", // Session strategy set to "jwt"
  },
  jwt: {
    secret: process.env.JWT_SECRET, // JWT secret
  },

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },

    async session({ session, token }) {
      if (token?.user && typeof token.user === "object") {
        // Ensure token.user is an object
        const user = token.user as {
          token: string;
          tokenExpiryTime: Date;
          refreshToken: string;
          refreshTokenExpiryTime: Date;
          firstName: string;
          lastName: string;
          emailAddress: string;
          mobileNumber: string;
          userType: string;
        };

        session.user = {
          token: user.token || "",
          tokenExpiryTime: user.tokenExpiryTime || new Date(),
          refreshToken: user.refreshToken || "",
          refreshTokenExpiryTime: user.refreshTokenExpiryTime || new Date(),
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          emailAddress: user.emailAddress || "",
          mobileNumber: user.mobileNumber || "",
          userType: user.userType || "",
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          token: user.token,
          refreshToken: user.refreshToken,
          refreshTokenExpiryTime: user.refreshTokenExpiryTime,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          userType: user.userType,
        };
      }

      if (!token.user || typeof token.user !== "object") {
        token.user = {}; // Ensure it's an object
      }

      const typedUser = token.user as {
        token?: string;
        refreshToken?: string;
        refreshTokenExpiryTime?: Date;
        firstName?: string;
        lastName?: string;
        emailAddress?: string;
        userType?: string;
      };

      if (typedUser.token) {
        const decodedToken = jwt.decode(typedUser.token) as jwt.JwtPayload;
        if (decodedToken?.exp) {
          const expirationTime = new Date(decodedToken.exp * 1000);
          const currentTime = new Date();

          if (expirationTime < currentTime) {
            if (
              typedUser.refreshTokenExpiryTime &&
              new Date(typedUser.refreshTokenExpiryTime) > currentTime
            ) {
              const refreshTokendetails: RefreshToken = {
                token: typedUser.token,
                refreshToken: typedUser.refreshToken || "",
              };

              const response =
                typedUser.userType === "customer"
                  ? await getRefreshToken(refreshTokendetails)
                  : await getAgentRefreshToken(refreshTokendetails);

              if (response.data.token) {
                typedUser.token = response.data.token;
                typedUser.refreshToken = response.data.refreshToken;
                typedUser.refreshTokenExpiryTime =
                  response.data.refreshTokenExpiryTime;
              }
            } else {
              await signOut({ redirect: false });
              redirect("/auth/login");
            }
          }
        }
      }

      return token;
    },
  },

  cookies: {
    sessionToken: {
      name: `secure-swauth.session-token`, // Custom session token name
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      },
    },
    csrfToken: {
      name: `secure-swauth.csrf-token`, // Custom CSRF token name
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `secure-swauth.callback-url`, // Custom callback URL cookie name
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});

export { handler as GET, handler as POST };
