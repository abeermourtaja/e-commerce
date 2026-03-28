import getProducts from '@/api/getProducts';
import { ProductList } from '@/Interfaces/Products.interface';
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers';
import React from 'react'
import { FaBoxArchive } from 'react-icons/fa6';
import ProductItem from '../_components/proudctItem/ProductItem';

export default async function Shop() {
   const dataProducts=await getProducts();
    const products=dataProducts?.data;
  return (
    <div>
      <div className="h-[200px] bg-[#21c35d] flex items-center ">
        <div className="flex gap-3 items-center w-4/5 mx-auto ">
          <div className="bg-[#4ccb7b] p-6 rounded-xl">
            <FaBoxArchive className='text-white text-3xl' />
          </div>
          <div className='flex flex-col items-start justify-center '>
            <h1 className='font-bold text-4xl text-white '>All Products</h1>
            <h1 className=' font-medium text-[#d2f3de]'>Explore our complete product collection</h1>
          </div>
      </div>
      </div>
      <div className='mx-auto w-4/5 '>
      <div className="my-4 text-sm text-gray-500 font-semibold">Showing {products.length} products</div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 my-4">
      {products.map((product:ProductList)=>{
        return <ProductItem key={product._id} product={product}/>
      })}
    </div>
    </div>
    </div>
  )
}
