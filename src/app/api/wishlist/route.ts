import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token=await getToken({req});
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers:{
            token:token?.token!
        }
    })
    const payload=await data.json();
    return NextResponse.json(payload)
}