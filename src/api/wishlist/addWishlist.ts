'use server'
import { getToken } from "@/utilites/getToken";

export async function addToWishlist(productId:string){
    const token=await getToken();
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        method:'POST',
        body:JSON.stringify({productId}),
        headers:{
            token:token?.token!,
            'content-type':'application/json'
        }
    })
    const payload=await data.json();
    console.log(payload)
    return payload;
}