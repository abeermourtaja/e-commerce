'use clinet'
import getCategories from '@/api/getCategories'
import { Category } from '@/Interfaces/Products.interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function CategoryItem({category}:{category:Category}) {
    
  return (
    <Link href={`/categories/${category?._id}`} className='shadow-lg p-5 rounded-lg border-1 border-border flex items-center flex-col gap-3 '>
            <Image className='rounded-full  object-cover size-20' src={category.image} height={120} width={120} alt={category?.name}></Image>

      <h1 className='font-bold '>{category?.name}</h1>
    </Link >
  )
}
