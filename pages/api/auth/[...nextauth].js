import moment from "moment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { generateToken } from "@/src/lib/generateToken";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "my-projects",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        let data = {
          error: false,
          data: {
            id: 1,
            email: "example@example.com",
            avatars: "",
          },
        };

        const token = await generateToken(data?.data, "1d");
        Reflect.set(data, "token", token);

        //call service
        return {
          ...data,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 24*60*60,
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    maxAge: 24*60*60,
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ account, profile, user, credentials }) {
      switch (account?.provider) {
        case "credentials":
          return user?.error === false;
        default:
          return false;
      }
    },
    async jwt({ token, user, profile, account }) {
      user && (token.user = user);
      profile && (token.profile = profile);
      account && (token.profile = account);
      return {
        ...token,
        user: {
          bearer_token: token?.user?.token ?? null,
          id: token?.user?.data?.id ?? null,
          email: token?.user?.data?.email ?? null,
        },
      };
    },
    async session({ session, token, user, profile }) {
      if (Date.now() > moment(session?.expires)) {
        return null;
      }
      session.user = token?.user;
      session.profile = token?.profile ?? null;
      session.account = token?.account ?? null;
      session.data = token ?? null;

      return session;
    },
  },
  debug: true,
});
