import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import payment from '@/models/Payment'
import Username from '@/app/[username]/page'
import connectDb from '@/db/connectDb'

export const authoptions = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
    ],

    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                // no maxAge/expires here — makes it a session-only cookie
            },
        },
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "github") {
                await connectDb()
                // await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Chai")

                const currentUser = await User.findOne({ email: user.email })

                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                    await newUser.save()
                }   
                return true
            }
            return true
        },
         
        async session({ session, user, token }) {
            const dbUser = await User.findOne({email: session.user.email})
            console.log(dbUser);
            session.user.name = dbUser.username
            return session
        },
    }

})

export { authoptions as GET, authoptions as POST }