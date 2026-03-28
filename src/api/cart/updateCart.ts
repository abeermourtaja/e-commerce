'use server'

import { getToken } from "@/utilites/getToken"
export async function updateCart({productId,count}:{productId:string,count:number}){
    const token=await getToken()
    if(!token) throw new Error('unauthorized')
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        method:'PUT',
        body:JSON.stringify({count}),
        headers:{
            token:token?.token!,
            'content-type':'application/json'
        }
    })
    const payload=await data.json();
    return payload;
}