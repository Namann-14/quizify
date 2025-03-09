import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/db";
import UserModel from "@/models/user.model";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({session}){
      const sessionUser = await UserModel.findOne({email: session.user.email});
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile}){
      try {
        await connectDB();
        const userExist = await UserModel.findOne({email: profile.email});
        if (!userExist) {
          const newUser = UserModel.create({
            name: profile.name,
            email: profile.email,
            image: profile.avatar_url,
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    } 
  },
});

export { handler as GET, handler as POST };
