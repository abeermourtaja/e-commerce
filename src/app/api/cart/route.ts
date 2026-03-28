import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token= await getToken({req});
    if(!token)
        return NextResponse.json({error:'unauthorized',status:401})
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
            token:token.token,
            'content-type':'application/json'
        }
        
    })
    const payload=await data.json();
    if(!data.ok)
        return NextResponse.json({error:data.statusText,status:data.status})
    return NextResponse.json(payload)

}