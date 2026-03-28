import { headers } from "next/headers";

export default async function getProducts(){
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{method:'Get'});
    const data=res.json();
    return data;
}