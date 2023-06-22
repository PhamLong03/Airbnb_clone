import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from '@/app/libs/prismadb'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import NextAuth from "next-auth";


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,            
        }),
        Credentials({
            name: 'Creadentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials, req) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid creadentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user.hashedPassword){
                    throw new Error('Invalid credentials')
                }

                const isCorrect = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if(!isCorrect) {
                    throw new Error('Invalid creadentials: Incorrect Password')
                }
                return user
            },
        })
    ],
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)