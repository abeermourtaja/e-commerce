import getSpecificProducts from '@/api/getSpecificProducts';
import ProductItem from '@/app/_components/proudctItem/ProductItem';
import { Button } from '@/components/ui/button';
import { ProductList } from '@/Interfaces/Products.interface'
import Image from 'next/image';
import React from 'react'
import { FaRegHeart, FaRegStar, FaShareAlt, FaStar } from 'react-icons/fa';
import { FaCartShopping, FaRegStarHalfStroke } from 'react-icons/fa6';
import { ImPower } from 'react-icons/im';
import { MdSecurity } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
export default async function ProductDetails({params}:{params:Promise<{id:string}>}) {
    const id= (await (params)).id
    console.log(id)
    const product=await getSpecificProducts(id);
  return (
   <div className="container w-4/5 my-10 mx-auto ">
     <div className='flex gap-5 items-start'>
      <div className="w-2/7 rounded-xl p-3 border-1 border-border flex flex-col shadow-md sticky top-10">
        <Image className='size-100 object-cover ' height={100} width={100} src={product?.imageCover} alt={product?.title}></Image>
        <div className="flex gap-2 overflow-hidden">
          {(product?.images)?.map((img)=>{
            return <Image height={100} width={100} src={img} alt={product?.title}></Image>
          })}
        </div>
      </div>
      <div className="rounded-xl p-5 w-5/7 border-border border-1 flex flex-col shadow-md gap-4">
        <div className="flex gap-3">
          <div className='p-2 font-medium text-xs rounded-xl bg-[#f0fdf4]'>
            <p>{product?.category.name}</p>
          </div>
          <div className='p-2 font-medium text-xs rounded-xl bg-[#f3f4f6]'>
            <p>{product?.brand.name}</p>
          </div>
        </div>
        <h1 className='font-bold text-2xl'>{product?.slug}</h1>
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
          <p className="text-xs text-gray-500">{product?.ratingsAverage } <span>({product?.ratingsQuantity} reviews)</span> </p>
        </div>
        <h4 className="text-3xl font-bold">{product?.price} EGP {product?.priceAfterDiscount &&<span className='text-sm line-through text-gray-500 '>{product?.priceAfterDiscount} EGP</span>}</h4>
        <div className='p-2 font-medium text-xs rounded-xl bg-[#f0fdf4] flex gap-2 items-center w-fit '>
            <div className='bg-green size-2 rounded-full'></div>
            <p className='text-green'>In Stoke</p>
        </div>
        <hr />
        <p className='text-[#4A5565]'>{product?.description}</p>
        <p className='text-[#4A5565] text-sm'>Quantity</p>
        <div className='flex items-center gap-2'>
          <div className='rounded-lg border-3 border-border w-fit'>
            <Button className='bg-white text-[#4a5565]'>-</Button>
            <input type="number" className='w-[40px]'/>
            <Button className='bg-white text-[#4a5565]'>+</Button>
          </div>
        <p className='text-[#6a7282]'>{product?.quantity} available</p>        
        </div>
        <div className="flex items-between items-center justify-between">
          <p>Total Price:</p>
          <h4 className="text-xl font-bold text-green">{(product?.price)} EGP </h4>
        </div>
        <div className='w-full flex gap-2'>
          <Button className='bg-[#16a34a] py-5 w-1/2'> <FaCartShopping className='text-white' /> Add to Cart</Button>
          <Button className='py-5 w-1/2'><ImPower /> Buy Now</Button>
        </div>
        <div className='w-full flex gap-2'>
          <Button className='bg-white border-border border-2 w-[90%] text-[#364153] py-5'><FaRegHeart />Add to Wishlist</Button>
          <Button className='bg-white border-2 border-border w-[10%] text-[#364153] py-5'>
            <FaShareAlt />
          </Button>
        </div>
        <div className='flex gap-38 '>
          <div className="flex items-center gap-3 ">
              <div className="size-12 bg-bgGreen rounded-full flex items-center justify-center">
                  <TbTruckDelivery className='text-green text-xl'/>
              </div>
              <div className="flex flex-col items-start">
                  <h5 className='font-semibold text-xs'>Free Delivery</h5>
                  <p className='font-medium text-xs text-[#6A7282]'>Orders over $50</p>
              </div>
          </div>
          <div className="flex items-center gap-3 ">
              <div className="size-12 bg-bgGreen rounded-full flex items-center justify-center">
                  <TbTruckDelivery  className='text-green text-xl'/>
              </div>
              <div className="flex flex-col items-start">
                  <h5 className='font-semibold text-xs'>30 Days Return</h5>
                  <p className='font-medium text-xs text-[#6A7282]'>Money back</p>
              </div>
          </div>
          <div className="flex items-center gap-3 ">
              <div className="size-12 bg-bgGreen rounded-full flex items-center justify-center">
                  <MdSecurity  className='text-green text-xl'/>
              </div>
              <div className="flex flex-col items-start">
                  <h5 className='font-semibold text-xs'>Secure Payment</h5>
                  <p className='font-medium text-xs text-[#6A7282]'>100% Protected</p>
              </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}
