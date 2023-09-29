import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

// export const runtime = "edge"

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
  }
})

export {handler as GET, handler as POST}