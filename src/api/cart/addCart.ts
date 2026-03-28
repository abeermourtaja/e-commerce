'use server'
import { getToken } from "@/utilites/getToken";

export async function addCart(productId:string){
    const token=await getToken();
    if(!token) throw new Error('unauthorized!')
    const data=await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'POST',
        body:JSON.stringify({productId}),
        headers:{
            token:token.token,
            'Content-type':'application/json'
        }
    });
    const payload=await data.json()
    console.log(payload)
    return payload;
}