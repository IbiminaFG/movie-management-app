import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Account from "@/models/account";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await Account.findOne({
          email: session.user.email,
        });
        session.user.id = sessionUser._id.toString();

        return session;
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const account = await Account.findOne({ email });

          if (!account) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            account.password
          );

          if (!passwordsMatch) {
            return null;
          }

          return account;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
