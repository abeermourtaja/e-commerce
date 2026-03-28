import getProducts from '@/api/getProducts'
import { Button } from '@/components/ui/button'
import { ProductList } from '@/Interfaces/Products.interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegEye, FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa'
import { FaArrowsRotate, FaRegStarHalfStroke } from 'react-icons/fa6'
import ButtonCom from '../shared/ButtonCom'
import { addToWishlist } from '@/api/wishlist/addWishlist'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import WishlistButton from './wishlistButton'

export default async function ProductItem({product}:{product:ProductList}) {
 
  return (
    <div className="flex flex-col gap-3 rounded-xl border-1 border-border p-4 relative hover:translate-y-[-4px] hover:shadow-md transition-transform ">
      <Image className='w-full object-cover' width={400} height={400} src={product?.imageCover} alt="logo" />
        <div>{product?.priceAfterDiscount &&<div className="bg-[#FB2C36] absolute top-2 rounded-lg p-2 text-white text-xs font-bold">-{(((product?.price-product?.priceAfterDiscount)/product?.price)*100).toFixed(0)}%</div>}</div>
        <div className='flex flex-col align-self-end gap-4 absolute top-2 end-2'>
              <WishlistButton productId={product?._id}></WishlistButton>
              <button className="shadow-lg p-2 rounded-full bg-white">
                <FaArrowsRotate className='text-[#4A5565] hover:text-green' />

              </button>
              <Link href={`/products/${product?._id}`} className="shadow-lg p-2 rounded-full bg-white">
                <FaRegEye className='text-[#4A5565] hover:text-green' />

              </Link>
      </div>
      <p className="text-xs text-gray-500">{product?.category?.name}</p>
      <p className="text-lg line-clamp-1">{product?.title}</p>
      <div className="flex gap-1">
        {Array.from({ length: Math.floor(product?.ratingsAverage || 0) }).map((_, i) => (
            <FaStar key={i} className="text-yellow-300" />
          ))}
          {product?.ratingsAverage % 1 !== 0 && (
            <FaRegStarHalfStroke className="text-yellow-300" />
          )}
          {
            Array.from({ length: 5-Math.floor(product?.ratingsAverage || 0)- (product?.ratingsAverage % 1 !== 0 ? 1 : 0) }).map((_, i) => (
                <FaRegStar  key={i} className="text-yellow-300" />
            ))}
          

        <p className="text-xs text-gray-500">{product?.ratingsAverage } <span>({product?.ratingsQuantity})</span> </p>

      </div>
      <div className="flex justify-between">
        <h4 className="text-lg font-bold">{product?.price} EGP {product?.priceAfterDiscount &&<span className='text-sm line-through text-gray-500 '>{product?.priceAfterDiscount} EGP</span>}</h4>
        <ButtonCom  children='+' className='bg-green rounded-full text-xl' productId={product?._id}  ></ButtonCom>
      </div>
    </div>
  )
}
