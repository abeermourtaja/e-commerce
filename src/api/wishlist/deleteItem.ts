import { getToken } from "@/utilites/getToken";

export async function deleteItemWishList(productId:string){
    const token=await getToken();
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        method:'DELETE',
        headers:{
            token:token?.token!,
            'content-type':'application/json'
        }
        
    })
    const payload=await data.json()
    return payload;
}