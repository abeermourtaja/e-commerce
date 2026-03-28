'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken(){
    const cookie=await cookies();
    const nextAuthToken=cookie.get('next-auth.session-token')?.value;
    const decodeCookie=await decode({secret:process.env.NEXTAUTH_SECRET!,token:nextAuthToken!})
    return decodeCookie;
}