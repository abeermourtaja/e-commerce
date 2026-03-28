import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { MdSecurity } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import RegisterForm from './registerForm/registerForm'

export default function Register() {
  return (
    <div className='flex w-4/5 mx-auto py-9 gap-5 my-4'>
      <div className='flex flex-col w-1/2'>
        <h1 className='font-bold text-4xl'>Welcom to <span className='text-green'>FreshCart</span></h1>
        <p className='font-medium text-xl text-[#364153]'>Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
        <div className="flex flex-col my-3 gap-4">
            <div className="flex items-center gap-3 ">
                <div className="size-12 bg-bgGreen rounded-full flex items-center justify-center">
                    <FaStar className='text-green text-xl'/>
                </div>
                <div className="flex flex-col items-start">
                    <h5 className='font-semibold text-lg'>Premium Quality</h5>
                    <p className='font-medium text-base text-[#4A5565]'>Premium quality products sourced from trusted suppliers.</p>
                </div>
            </div>
            <div className="flex items-center gap-3 ">
                <div className="size-12 bg-bgGreen rounded-full flex items-center justify-center">
                    <TbTruckDelivery  className='text-green text-xl'/>
                </div>
                <div className="flex flex-col items-start">
                    <h5 className='font-semibold text-lg'>Fast Delivery</h5>
                    <p className='font-medium text-base text-[#4A5565]'>Same-day delivery available in most areas</p>
                </div>
            </div>
            <div className="flex items-center gap-3 ">
                <div className="size-12 bg-bgGreen rounded-full flex items-center justify-center">
                    <MdSecurity  className='text-green text-xl'/>
                </div>
                <div className="flex flex-col items-start">
                    <h5 className='font-semibold text-lg'>Secure Shopping</h5>
                    <p className='font-medium text-base text-[#4A5565]'>Your data and payments are completely secure</p>
                </div>
            </div>
            <div className="my-4 rounded-xl shadow-lg p-5">
                <div className="flex gap-4">
                    <Image  src={`/assets/review-author.webp`} alt='profile' height={40} width={50} />
                    <div>
                        <h1>Sarah Johnson</h1>
                        <div className="flex my-1 gap-1">
                            <FaStar className='text-yellow-400 text-lg'/>
                            <FaStar className='text-yellow-400 text-lg'/>
                            <FaStar className='text-yellow-400 text-lg'/>
                            <FaStar className='text-yellow-400 text-lg'/>
                            <FaStar className='text-yellow-400 text-lg'/>
                        </div>
                    </div>
                </div>
                <p className='my-2 text-[#4A5565]'>"FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"</p>
            </div>
        </div>
      </div>
      <div className="flex flex-col gap-7 shadow-lg rounded-xl border-1 border-border p-5 w-1/2">
        <div className="text-center flex flex-col gap-3">
            <h1 className='font-bold text-3xl'>Create Your Account</h1>
            <p>Start your fresh journey with us today</p>
            <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  )
}
