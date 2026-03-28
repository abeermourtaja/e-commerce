import React from 'react'
import { FaTruck } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className='bg-[#f0fdf4] '>
        <div className='xl:w-4/5 xl:mx-auto w-full p-5 items-start flex md:flex-row gap-10 justify-between flex-wrap flex-col'>
            <div className='flex gap-3 '>
                <div className="rounded-xl text-green bg-bgGreen p-3 ">
                    <FaTruck />
                </div>
                <div className="flex flex-col ">
                    <h1 className='text-sm font-semibold'>Free Shipping</h1>
                    <p className='text-xs text-[#6b7685]'>On orders over 500 EGP</p>
                </div>
            </div>
            <div className='flex gap-3 '>
                <div className="rounded-xl text-green bg-bgGreen p-3 ">
                    <FaTruck />
                </div>
                <div className="flex flex-col ">
                    <h1 className='text-sm font-semibold'>Easy Returns</h1>
                    <p className='text-xs text-[#6b7685]'>On orders over 500 EGP</p>
                </div>
            </div>
            <div className='flex gap-3 '>
                <div className="rounded-xl text-green bg-bgGreen p-3 ">
                    <FaTruck />
                </div>
                <div className="flex flex-col ">
                    <h1 className='text-sm font-semibold'>Secure Payment</h1>
                    <p className='text-xs text-[#6b7685]'>100% secure checkout</p>
                </div>
            </div>
            <div className='flex gap-3 '>
                <div className="rounded-xl text-green bg-bgGreen p-3 ">
                    <FaTruck />
                </div>
                <div className="flex flex-col ">
                    <h1 className='text-sm font-semibold'>24/7 Support</h1>
                    <p className='text-xs text-[#6b7685]'>Contact us anytime</p>
                </div>
            </div>
            
        </div>
        
    </div>
  )
}
