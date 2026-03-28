import { Address } from "@/Interfaces/address.interface";
import { getToken } from "@/utilites/getToken"

export async function addAddress(formData:any){
    const token=await getToken();
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`,{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
            'content-type':'application/json',
            token:token?.token!
        }
    })
    const payload=await data.json()
    return payload;
}