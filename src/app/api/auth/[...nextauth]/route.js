import User from "@/models/userModel";
import { dbconnect } from "@/utils/mongo";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ account, profile }) {
      try {
        dbconnect();
        const user = await User.findOne({ email: profile.email });
        if (!user) {
          const newUser = new User({
            email: profile.email,
            image: profile.picture,
            password: profile.at_hash,
          });
          await newUser.save();
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
