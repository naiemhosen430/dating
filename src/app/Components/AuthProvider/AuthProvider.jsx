import User from "@/models/userModel";
import NextAuth, { NextAuthOption } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const NextAuthOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
};

const handler = NextAuth(NextAuthOption);

export { handler as GET, handler as POST };
