import { getToken } from '@/utilites/getToken';

export async function getCart(){
    const token=await getToken();
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
            token:token?.token!,
        }
    })
    const payload=await data.json();
    console.log(payload)
    return payload
    
}