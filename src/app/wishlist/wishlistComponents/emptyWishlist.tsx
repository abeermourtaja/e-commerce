import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight, FaHeart, FaRegHeart } from 'react-icons/fa'

export default function EmptyWishlist() {
  return (
    
    <div  className='flex items-center justify-center text-center flex-col gap-4 p-5 m-5 h-[600px] w-1/3 mx-auto'>
      <div className="rounded-xl size-20 bg-[#f3f4f6] flex items-center justify-center">
        <FaRegHeart className='text-4xl text-[#99a1af]'/>
      </div>
      <h1 className='font-bold text-2xl'>Your Wishlist is empty</h1>
      <p className='font-medium text-gray-500'>Browse products and save your favorites here.</p>
        <Link href={'/products'}>
          <Button className='bg-green text-white p-5 flex gap-1 items-center'>Browse Products <FaArrowRight/></Button>
        </Link>
    </div>
  )
}
