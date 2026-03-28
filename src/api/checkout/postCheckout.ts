import { addressSchemaType } from "@/app/checkout/schema/address.schema";
import { getToken } from "@/utilites/getToken"

export async function sendCheckout(formData:addressSchemaType,cartId:string){
    const token=await getToken()
    const data=await fetch( `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        method:'POST',
        body:JSON.stringify({formData}),
        headers:{
            token:token?.token!,
            'content-type':'application/json'
        }
    })
    const payload=await data.json()
    return payload;
}