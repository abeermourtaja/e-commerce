import getProducts from '@/api/getProducts';
import getSpecificCategories from '@/api/getSpecificCategories';
import ProductItem from '@/app/_components/proudctItem/ProductItem';
import { Category, ProductList } from '@/Interfaces/Products.interface';
import Image from 'next/image';
import React from 'react'
import EmptyCategories from '../EmptyCategories';

export default async function subCategries({params}:{params:Promise<{id:string}>}) {
    const id= (await (params)).id
    const data = await getSpecificCategories(id);
    const category:Category=data?.data
    const productsData=await getProducts();
    const products= productsData?.data
    const filteredProducts = products?.filter(
    (product: ProductList) => product?.category?._id === id
  );

  return (
    <div>
        <div className="h-[200px] bg-[#21c35d] flex items-center ">
          <div className="flex gap-3 items-center w-4/5 mx-auto ">
            <div className="bg-[#4ccb7b] p-6 rounded-xl">
              <Image className='' src={category?.image} alt={category?.name} height={30} width={30} />
            </div>
            <div className='flex flex-col items-start justify-center '>
              <h1 className='font-bold text-4xl text-white '>{category?.name}</h1>
              <h1 className=' font-medium text-[#d2f3de]'>Browse products in {category?.name}</h1>
            </div>
          </div>
        </div>
        {filteredProducts.length==0?<EmptyCategories/>: <div className='mx-auto w-4/5 my-7 '>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 my-4">
            {filteredProducts?.map((product:ProductList)=>{
                return <ProductItem key={product._id} product={product}/>
            })}
          </div>
      </div>}
      </div>
  )
}
