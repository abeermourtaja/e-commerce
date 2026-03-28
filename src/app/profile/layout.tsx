import Link from 'next/link'
import React from 'react'
import { FaArrowRight, FaUser } from 'react-icons/fa'
import { FaGear, FaLocationDot } from 'react-icons/fa6'
import { MdKeyboardArrowRight } from 'react-icons/md'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <div>
      <div className="h-[200px] bg-[#21c35d] flex items-center ">
        <div className="flex gap-3 items-center w-4/5 mx-auto ">
          <div className="bg-[#4ccb7b] p-6 rounded-xl">
            <FaUser className='text-white text-3xl' />
          </div>
          <div className='flex flex-col items-start justify-center '>
            <h1 className='font-bold text-4xl text-white '>My Account</h1>
            <h1 className=' font-medium text-[#d2f3de]'>Manage your addresses and account settings</h1>
          </div>
        </div>
      </div>
      <div className='w-4/5 mx-auto flex lg:flex-nowrap flex-wrap gap-10 my-4 mb-50 items-start'>
        <div className=" gap-4 rounded-xl p-4 border border-border lg:w-[22%] w-full flex flex-col shadow-lg">
        <h1 className='font-bold text-lg'>My Account</h1>
        <hr />
        <Link href={'/profile/addresses'} className="flex justify-between items-center rounded-xl ">
          <div className="flex gap-2 items-center">
          <div className=" bg-[#f3f4f6] items-center gap-2 rounded-lg p-3">
            <FaLocationDot className='text-[#6a7282]'/>
          </div>
          <h2 className='text-base font-medium'>My Addresses</h2>
        </div>
        <MdKeyboardArrowRight className='text-[#99a1af] text-lg'/>

        </Link>
        <Link href={'/profile/settings'} className="flex justify-between items-center rounded-xl ">
          <div className="flex gap-2 items-center">
          <div className=" bg-[#f3f4f6] items-center gap-2 rounded-lg p-3">
            <FaGear className='text-[#6a7282]'/>
          </div>
          <h2 className='text-base font-medium'>Settings</h2>
        </div>
        <MdKeyboardArrowRight className='text-[#99a1af] text-lg'/>

        </Link>
      </div>
      <div className='lg:w-[78%] w-full'>
        {children}
      </div>
      </div>
    </div>

    </div>
  )
}