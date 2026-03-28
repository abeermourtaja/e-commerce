import getProducts from '@/api/getProducts';
import { Category, ProductList } from '@/Interfaces/Products.interface';
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers';
import React from 'react'
import { FaBoxArchive } from 'react-icons/fa6';
import ProductItem from '../_components/proudctItem/ProductItem';
import getCategories from '@/api/getCategories';
import CategoryItem from '../_components/categoryItem/CategoryItem';
import { IoLayers } from 'react-icons/io5';

export default async function Categories() {
   const dataCategories=await getCategories();
    const categories=dataCategories?.data;
  return (
    <div>
      <div className="h-[200px] bg-[#21c35d] flex items-center ">
        <div className="flex gap-3 items-center w-4/5 mx-auto ">
          <div className="bg-[#4ccb7b] p-6 rounded-xl">
            <IoLayers className='text-white text-3xl' />
          </div>
          <div className='flex flex-col items-start justify-center '>
            <h1 className='font-bold text-4xl text-white '>All Categories</h1>
            <h1 className=' font-medium text-[#d2f3de]'>Browse our wide range of product categories</h1>
          </div>
       </div>
      </div>
      <div className='mx-auto w-4/5 my-7 '>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 my-4">
        {categories.map((category:Category)=>{
          return <CategoryItem key={category._id} category={category}/>
        })}
      </div>
    </div>
  </div>
  )
}
