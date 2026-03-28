import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, 
  providers: [
    Credentials({
      name: "login credentials",
      credentials: {
        email: { label: "username", placeholder: "email" },
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: {
            "content-type": "application/json",
          },
        });

        const payload = await res?.json();
       

        const tokenData = jwtDecode<any>(payload.token);

        return {
          id: tokenData?.id,
          email: payload.user?.email,
          name: payload.user?.name,
          token: payload.token,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.name = token.name! ;
        session.user.email = token.email! ;
        session.user.id = token.id ;
      }

      session.token = token.token ;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};