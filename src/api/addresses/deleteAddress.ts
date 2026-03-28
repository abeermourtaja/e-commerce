import { Address } from "@/Interfaces/address.interface";
import { getToken } from "@/utilites/getToken"

export async function deleteAddress(addressId:string){
    const token=await getToken();
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json',
            token:token?.token!
        }
    })
    const payload=await data.json()
    return payload;
}