import { Category } from "@/Interfaces/Products.interface";

export default async function getSpecificCategories(id:string){
   try{
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`,{method:'Get'});
    const data=res?.json();
    return data
   }catch(err){
    throw new Error(err?.toString())
   }
}