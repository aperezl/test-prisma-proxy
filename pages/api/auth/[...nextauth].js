import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import jwt from 'jsonwebtoken'
import { getToken } from "next-auth/jwt"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

console.log(process.env.NEXTAUTH_SECRET)
export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    maxAge: 60 * 60 * 24 * 30,
    // async encode({ secret, token, maxAge }) {
    //   console.log('encode', { secret, token, maxAge })
    //   const jwtClaims = {
    //     sub: token.id,
    //     name: token.name,
    //     email: token.email,
    //     iat: Date.now() / 1000,
    //     exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    //   }
    //   const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'HS256' })
    //   return encodedToken
    // },
    // async decode({ secret, token }) {
    //   const decodedToken = jwt.verify(token, secret, { algorithm: 'HS256' })
    //   return decodedToken
    // },
  },
  callbacks: {
    async session({ session, user, token }) {
      console.log({ session, user, token })
      const encodedToken = jwt.sign(token, 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw', { algorithm: 'HS256' })
      session.id = token.id
      session.token = encodedToken
      return Promise.resolve(session)
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log({ token, user, account, profile, isNewUser })
      const ifUserSignedIn = user ? true : false
      if (ifUserSignedIn) {
        token.id = user.id
      }
      return Promise.resolve(token)
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0'
    })
  ],
})