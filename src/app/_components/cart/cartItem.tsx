'use client'
import { deleteItemCart } from '@/api/cart/deleteItemCart'
import { updateCart } from '@/api/cart/updateCart'
import { addToWishlist } from '@/api/wishlist/addWishlist'
import { Button } from '@/components/ui/button'
import { productDetails } from '@/Interfaces/cart.interface'
import { ProductList } from '@/Interfaces/Products.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { ImBin2 } from 'react-icons/im'

export default function CartItem({product}:{product:productDetails}) {
  const useClient=useQueryClient();
  
   const {mutate:deleteCart,isPending:deletePending}=useMutation({
      mutationKey:['cart'],
      mutationFn:deleteItemCart,
      onSuccess:async()=>{
        useClient.invalidateQueries({queryKey:['cart']})
      }
    });
    const {mutate:updateCartMutate,isPending:updatePending}=useMutation({
      mutationKey:['cart'],
      mutationFn:updateCart,
      onSuccess:async()=>{
        useClient.invalidateQueries({queryKey:['cart']})
      }
    });
    
  return (
    <div className='p-4 border border-border shadow-lg rounded-xl flex gap-4' >
      <div className="rounded-xl p-3 border border-border">
        <Image className='size-40' height={200} width={200} src={product?.product?.imageCover} alt="img-title"/>
      </div>
      <div className='flex flex-col gap-3 items-start w-full'>
        <h1 className='font-bold text-xl'>{product.product?.title}</h1>
        <div className="bg-[#f0fdf4] rounded-xl p-1 flex justify-center ">
            <div className="text-green text-sm">{product?.product.category?.name}</div>
        </div>
        <h1 className='text-green font-bold text-2xl'>{product?.price} EGP</h1>
        <div className='flex justify-between w-full items-center '>
            <div className="flex gap-4 bg-[#f9fafb] border border-border rounded-xl p-1 items-center justify-center ">
                <Button onClick={()=>{updateCartMutate({ productId: product.product._id, count: product.count - 1})}} className='bg-white text-gray-500 shadow '><FiMinus /></Button>
                <h1 className='font-bold text-xl'>{product?.count}</h1>
                <Button onClick={()=>{updateCartMutate({productId: product.product._id,count: product.count + 1})}} className='bg-green text-white'><FiPlus /></Button>
            </div>
            <div className='flex gap-2 items-end justify-center text-sm font-medium'>
                <h1 className='font-bold text-xl'>{product?.count*product?.price}</h1>
                <div className='flex flex-col gap-2 text-[#99a1af]'>
                    <p>Total</p>
                    <p> EGP</p>
                </div>
                <Button onClick={()=>deleteCart(product?.product?._id)} className='border border-[#ffc9c9] bg-[#fef2f2] hover:bg-[#fb2c36] group'><ImBin2 className='text-[#fb2c36] group-hover:text-white'/></Button>
            </div>
        </div>
      </div>
    </div>
  )
}
