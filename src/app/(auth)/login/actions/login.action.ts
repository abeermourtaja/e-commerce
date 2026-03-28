'use server'
import { loginSchemaType } from "../schema/login.schema";

export async function loginFn(formData:loginSchemaType){
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,{
        method:'Post',
        body:JSON.stringify(formData),
        headers:{
            'content-type':'application/json'
        }
    })
    const payload=await data.json()
    if(!data.ok) throw new Error(payload.message)
    return data.ok

}