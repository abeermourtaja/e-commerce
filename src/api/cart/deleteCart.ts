'use server'

import { getToken } from "@/utilites/getToken"


export async function deleteCart(){
    const token=await getToken()
    if(!token) throw new Error('unauthorized')
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        method:'DELETE',
        headers:{
            token:token?.token!,
            'content-type':'application/json'
        }
    })
    
    const payload=await data.json();
    console.log(payload)
    return payload;

}