import getProducts from '@/api/getProducts';
import getSpecificBrand from '@/api/getSpecificBrand';
import ProductItem from '@/app/_components/proudctItem/ProductItem';
import { Brand } from '@/Interfaces/brand.interface';
import { Category, ProductList } from '@/Interfaces/Products.interface';
import Image from 'next/image';
import React from 'react'
import EmptyBrand from '../EmptyBrand';

export default async function BrandDetails({params}:{params:Promise<{id:string}>}) {
    const id= (await (params)).id
    const data = await getSpecificBrand(id);
    const brand:Brand=data?.data
    const productsData=await getProducts();
    const products= productsData?.data
    const filteredProducts = products?.filter(
    (product: ProductList) => product?.brand?._id === id
  );

  return (
    <div>
        <div className="h-[200px] bg-[#21c35d] flex items-center ">
          <div className="flex gap-3 items-center w-4/5 mx-auto ">
            <div className="bg-[#4ccb7b] p-6 rounded-xl">
              <Image className='' src={brand?.image} alt={brand?.name} height={30} width={30} />
            </div>
            <div className='flex flex-col items-start justify-center '>
              <h1 className='font-bold text-4xl text-white '>{brand?.name}</h1>
              <h1 className=' font-medium text-[#d2f3de]'>Shop {brand?.name} proudcts</h1>
            </div>
          </div>
        </div>
        {filteredProducts.length==0?<EmptyBrand/>: <div className='mx-auto w-4/5 my-7 '>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 my-4">
            {filteredProducts?.map((product:ProductList)=>{
                return <ProductItem key={product._id} product={product}/>
            })}
          </div>
      </div>}
      </div>
  )
}
