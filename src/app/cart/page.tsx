'use client'
import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import CartItem from '../_components/cart/cartItem'
import { Button } from '@/components/ui/button'
import { FaLock, FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { TiTick } from 'react-icons/ti'
import { IoMdTrash } from 'react-icons/io'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { getCart } from '@/api/cart/getCart'
import { ProductList } from '@/Interfaces/Products.interface'
import {  Cart, productDetails } from '@/Interfaces/cart.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteItemCart } from '@/api/cart/deleteItemCart'
import { deleteCart } from '@/api/cart/deleteCart'
import EmptyCart from './cartComponents/emptyCart'

export default  function CartC() {
  
  const {data:cart,isPending}=useQuery({
    queryKey:['cart'],
    queryFn:async()=>{
      const data=await fetch(`api/cart`);
      const payload:Promise<Cart>=data.json();
      return payload;
    }
  });
 const useClient=useQueryClient();
    const {mutate:deleteAllCart,isPending:deletePending}=useMutation({
       mutationKey:['cart'],
       mutationFn:deleteCart,
       onSuccess:async()=>{
          useClient.invalidateQueries({queryKey:['cart']})
       }
     });
    const delivery=cart?.data?.totalCartPrice!>500?0:50;

  return (
    <>
    {(cart?.data?.products.length!=0)?<div className='flex flex-col gap-3 my-5 mx-auto xl:w-4/5 lg:w-full p-3 '>
      <div className="flex gap-3 items-center">
        <div className="bg-green p-2 rounded-xl">
          <FaCartShopping className='text-white text-4xl' />
        </div>
        <h1 className='font-bold text-3xl'>Shopping Cart</h1>
      </div>
      <p className='text-[#6A7282] font-medium'>You have <span className='text-green font-semibold'>{cart?.numOfCartItems} items</span> in your cart</p>
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className='lg:w-2/3 w-full '>
        {cart?.data?.products?.map((cartItem:productDetails)=>{
          return <CartItem key={cartItem?._id} product={cartItem}></CartItem>
        })       } 
        <hr className='my-5'/>
        <div className='flex justify-between my-3'>
          <Link href={'/'} className='text-green font-semibold flex items-center gap-1'> <HiOutlineArrowNarrowLeft /> Continue Shopping</Link>
          <Button onClick={()=>{deleteAllCart()}} className='text-gray-500 bg-white flex items-center font-semibold gap-1'><IoMdTrash /> Clear all items</Button>

        </div>
      </div>
      <div className="lg:w-1/3 w-full border border-border rounded-xl bg-white stick top-10">
        <div className='bg-[#101828] text-white p-5 rounded-t-xl font-bold '>Order Summary</div>
        <div className='p-3 flex flex-col gap-3'>
          <div className="flex justify-between text-[#4a5565] font-semibold">
            <p>Subtotal ({cart?.numOfCartItems} items)</p>
            <p>{cart?.data?.totalCartPrice} EGP</p>
          </div>
          <div className="flex justify-between text-[#4a5565] font-semibold">
            <p>Shipping</p>
            <p className='text-green'>{cart?.data?.totalCartPrice!>500?'Free':'50 EGP'}</p>
          </div>
          <hr />
          <div className="flex justify-between ">
            <p className='font-bold text-xl'>Estimated Total</p>
            <p className='text-green font-bold'>{(cart?.data?.totalCartPrice!)+delivery} EGP</p>
        </div>
        <Link href={`/checkout/${cart?.cartId}`}> <Button className='bg-green font-bold p-6 w-full'><FaLock />Secure Checkout</Button></Link >
        <hr />
        <p className='text-[#6a7282] text-xs '>✓ Your cart items will be saved</p>
        <p className='text-[#6a7282] text-xs '>✓ Track your orders easily</p>
        <p className='text-[#6a7282] text-xs '>✓ Access exclusive member deals</p>
        </div>
      </div>
      </div>
    </div>
    :<EmptyCart/>

  }
  </>
  )
}
