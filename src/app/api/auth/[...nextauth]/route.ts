import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import jwt from "jsonwebtoken";
import { RefreshToken } from "@/core/models/authModel";
import {
  agentLogin,
  getAgentByToken,
  getAgentRefreshToken,
  getRefreshToken,
  getUserByToken,
  login,
} from "@/core/requests/authRequests";
import router from "next/navigation";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "sign-with-email",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials === undefined) {
          return null;
        }

        try {
          const loginResponse = await login(
            credentials?.username as string,
            credentials?.password as string
          );

          if (loginResponse.succeeded && loginResponse.data.token) {
            // const customerData = await getUserByToken(loginResponse.data.token);
            // console.log("customerData", customerData);
            let user = {
              token: loginResponse.data.token,
              refreshToken: loginResponse.data.refreshToken,
              refreshTokenExpiryTime: loginResponse.data.refreshTokenExpiryTime,
              firstName: loginResponse.data.firstName,
              lastName: loginResponse.data.lastName,
              emailAddress: loginResponse.data.emailAddress,
              mobileNumber: loginResponse.data.mobileNumber,
              userType: "customer",
            };
            return user as any;
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
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Agent Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials === undefined) {
          return null;
        }

        try {
          const loginResponse = await agentLogin(
            credentials?.username as string,
            credentials?.password as string
          );
          if (loginResponse && loginResponse?.data?.token) {
            // const agentData = await getAgentByToken(loginResponse.token);

            let agent = {
              token: loginResponse?.data?.token,
              refreshToken: loginResponse?.data?.refreshToken,
              refreshTokenExpiryTime:
                loginResponse?.data?.refreshTokenExpiryTime,
              firstName: loginResponse?.data?.firstName,
              lastName: loginResponse?.data?.lastName,
              emailAddress: loginResponse?.data?.emailAddress,
              mobileNumber: loginResponse?.data?.mobileNumber,
              userType: "agent",
              agentCode: loginResponse?.data?.agentCode,
            };
            return agent as any;
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
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async session({ session, token }: any) {
      if (token.user) {
        session.user = {
          token: token?.user?.token as unknown as string,
          refreshToken: token?.user?.refreshToken as unknown as string,
          refreshTokenExpiryTime: token?.user
            ?.refreshTokenExpiryTime as unknown as Date,
          firstName: token?.user?.firstName as unknown as string,
          lastName: token?.user?.lastName as unknown as string,
          emailAddress: token?.user?.emailAddress as unknown as string,
          userType: token?.user?.userType as unknown as boolean,
          printName: token?.user?.printName as unknown as string,
        };
      }

      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          token: user.token,
          refreshToken: user.refreshToken,
          refreshTokenExpiryTime: user.refreshTokenExpiryTime,
          firstName: user.firstName,
          lastName: user.lastName,
          printName: user.printName,
          emailAddress: user.emailAddress,
          contactNumber: user.contactNumber,
          userType: user.userType,
        };
      }

      if (token && token?.user?.token) {
        const decodedToken = jwt.decode(token.user.token) as jwt.JwtPayload;
        if (decodedToken && decodedToken.exp) {
          const expirationTime = new Date(decodedToken.exp * 1000);
          const currentTime = new Date();
          if (expirationTime < currentTime) {
            if (new Date(token.user.refreshTokenExpiryTime) > currentTime) {
              const refreshTokendetails: RefreshToken = {
                token: token.user.token,
                refreshToken: token.user.refreshToken,
              };
              const response =
                token.user.userType == "customer"
                  ? await getRefreshToken(refreshTokendetails)
                  : await getAgentRefreshToken(refreshTokendetails);
              if (response.data.token) {
                token.user.token = response.data.token;
                token.user.refreshToken = response.data.refreshToken;
                token.user.refreshTokenExpiryTime =
                  response.data.refreshTokenExpiryTime;
              }
            } else {
              await signOut({
                redirect: false,
              });
              router.push("/auth/login");
            }
          }
        }
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
