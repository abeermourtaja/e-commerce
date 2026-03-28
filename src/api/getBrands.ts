export async function getBrands(){
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
    const payload=data.json();
    return payload;
}