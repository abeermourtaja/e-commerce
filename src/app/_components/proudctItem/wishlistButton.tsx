'use client'
import { addToWishlist } from '@/api/wishlist/addWishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { FaRegHeart } from 'react-icons/fa'

export default function WishlistButton({productId}:{productId:string}) {
    const useClient=useQueryClient();
    const {mutate,isPending}=useMutation({
        mutationKey:['product'],
        mutationFn:addToWishlist,
        onSuccess:async()=>{
            useClient.invalidateQueries({queryKey:['product']})
        }
    });
  return (
    <div>
      <button onClick={()=>mutate(productId)} className="shadow-lg p-2 rounded-full bg-white">
        <FaRegHeart className='text-[#4A5565] hover:text-red-600' />
    </button>
    </div>
  )
}
