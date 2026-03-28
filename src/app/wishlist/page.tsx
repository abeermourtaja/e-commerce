'use client'
import { addCart } from '@/api/cart/addCart';
import { deleteItemWishList } from '@/api/wishlist/deleteItem';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductList } from '@/Interfaces/Products.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaCheck, FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { toast } from 'sonner';
import EmptyWishlist from './wishlistComponents/emptyWishlist';

export default function WishList() {
  const {data,isPending}=useQuery({
    queryKey:['wishlist'],
    queryFn:async()=>{
      const data=await fetch(`api/wishlist`);
      const payload=await data.json();
      return payload;
    }
  });
  const useClient=useQueryClient()
  const {mutate,data:addCartData,isPending:addCartPending}=useMutation({
    mutationKey:['cart'],
    mutationFn:addCart,
    onSuccess:async(data)=>{
     toast(data.message,{position:'top-right',style:{
      backgroundColor:'green',
      color:'white',
      fontWeight:'bold'
     }})
      await useClient.invalidateQueries({queryKey:['cart']})
    },
    onError:()=>{
      toast('login first',{position:'top-right',style:{
      backgroundColor:'red'
     }})
    }
  })
  const {mutate:deleteWishListMutate,isPending:isPendingDelete}=useMutation({
    mutationKey:['wishlist'],
    mutationFn:deleteItemWishList,
    onSuccess:()=>{
      useClient.invalidateQueries({queryKey:['wishlist']})
    }
  })
  const products=data?.data;
  return (
    <div>
    {products?.length==0? <EmptyWishlist/>:<div className='mx-auto w-4/5 my-5 '>
      <div className="flex gap-3 items-center">
          <div className="bg-[#fef2f2] p-4 rounded-xl">
            <FaHeart className='text-red-600 text-xl' />
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h1 className='font-bold text-xl'>My Wishlist</h1>
            <h1 className='text-gray-500 font-medium'>{data?.count} items saved</h1>
          </div>
      </div>
      <div className='border border-border rounded-xl p-3 my-4 '>
      <Table className='w-full p-3 table-fixed'>
        <TableHeader className='bg-[#f9fafb]'>
            <TableRow >
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product:ProductList)=>{
            return <TableRow  key={product._id} className='bg-white p-2'>
                  <TableCell className='flex gap-3'>
                    <div className='flex items-center justify-center p-3 border border-border bg-[#f9fafb] rounded-xl '>
                      <Image className='size-10 ' src={product?.imageCover} alt={product?.title} height={200} width={200}></Image>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                      <h1 className='font-bold'>{product?.title}</h1>
                      <h1 className='text-gray-400'>{product?.category?.name}</h1>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <h1 className='font-semibold'>{product?.price} EGP</h1>
                      {product?.priceAfterDiscount &&<h1 className='font-semibold line-through text-gray-400'>{product?.priceAfterDiscount} EGP</h1>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='bg-[#f0fdf4] font-semibold rounded-2xl p-1 w-fit text-green flex items-center justify-center text-xs'>In Stoke</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {addCartData?.status==='success'?<Button className='bg-[#f3f4f6] text-[#2a3341] '><Link className='items-center flex gap-1' href={'/cart'}><FaCheck className='text-green'/>View Cart</Link></Button>:<Button onClick={()=>mutate(product?._id)} className='bg-green p-4 justify-center items-center flex'>{addCartPending? <div className='flex items-center gap-1'><FaCheck />Added</div>:<div className='flex items-center gap-1'><FaShoppingCart/> Add To Cart</div>}</Button>}
                      <Button onClick={()=>deleteWishListMutate(product?._id)} className='border-1 border-border bg-white  '><FaTrash className='text-[#99a1af]'/></Button>
                    </div>
                  </TableCell>
              </TableRow>
          })
              
          }
        </TableBody>
      </Table>
      </div>
      <Link className='font-medium text-sm text-gray-500 mb-20 flex items-center gap-1' href={'/'}><FaArrowLeftLong/> Continue Shopping</Link>

    </div>}
    </div>
  )
}
