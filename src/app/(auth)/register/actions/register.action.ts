'use server'
import { cookies } from 'next/headers';
import { registerSchemaType } from './../schema/register.schema';
export async function registerFn(formData:registerSchemaType){
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
            'content-type':'application/json'
        },        
    })
    const payload=await data.json();
    if(!data.ok) throw new Error(payload?.message)
    const cookie=await cookies()
    cookie.set('token',payload?.token,{
        maxAge:60*60*24,
        httpOnly:true,
    })
    return data.ok
};
    
