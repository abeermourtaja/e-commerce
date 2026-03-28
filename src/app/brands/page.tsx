import getProducts from '@/api/getProducts';
import { Category, ProductList } from '@/Interfaces/Products.interface';
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers';
import React from 'react'
import { FaBoxArchive } from 'react-icons/fa6';
import { IoLayers } from 'react-icons/io5';
import { getBrands } from '@/api/getBrands';
import { Brand } from '@/Interfaces/brand.interface';
import Link from 'next/link';
import Image from 'next/image';

export default async function Brands() {
   const dataBrands=await getBrands();
    const brands=dataBrands?.data;
    console.log(brands)
  return (
    <div>
      <div className="h-[200px] bg-[#8d50ff] flex items-center ">
        <div className="flex gap-3 items-center w-4/5 mx-auto ">
          <div className="bg-[#a169ff] p-6 rounded-xl">
            <IoLayers className='text-white text-3xl' />
          </div>
          <div className='flex flex-col items-start justify-center '>
            <h1 className='font-bold text-4xl text-white '>Top Brands</h1>
            <h1 className=' font-medium text-[#d2f3de]'>Shop from your favorite brands</h1>
          </div>
       </div>
      </div>
      <div className='mx-auto w-4/5 my-7 '>
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6 my-4">
        {brands.map((brand:Brand)=>{
          return <Link key={brand?._id} href={`/brands/${brand?._id}`} className='shadow-lg p-7 rounded-lg border-1 border-border flex items-center flex-col gap-3 h-[220px]'>
            <Image className='rounded-xl  size-27' src={brand.image} height={120} width={120} alt={brand?.name}></Image>

      <h1 className='font-bold '>{brand?.name}</h1>
    </Link >
        })}
      </div>
    </div>
  </div>
  )
}
