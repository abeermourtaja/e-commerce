import { ProductList } from "@/Interfaces/Products.interface";

export default async function getSpecificProducts(id:string):Promise<ProductList>{
    try{
        const data=await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        if(!data.ok) throw new Error('some error');
        const payload=await data.json();
        return payload?.data;
    }catch(error){
        throw new Error('some error');
    }
}