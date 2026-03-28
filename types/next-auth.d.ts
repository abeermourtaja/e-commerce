import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
interface applicatoinUser{
        name:string,
        email:string,
        id:string,
        token:string,
}
declare module "next-auth" {
    interface User{
        name:string,
        email:string,
        id:string,
        token:string,

    }
  interface Session {
    user: applicatoinUser,
    token:string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends applicatoinUser{
    
  }
}
export {}