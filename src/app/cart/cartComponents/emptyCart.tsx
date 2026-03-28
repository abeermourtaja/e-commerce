import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function EmptyCart() {
  return (
    <div  className='flex items-center justify-center text-center flex-col gap-4 p-5 m-5 h-[600px] w-1/3 mx-auto'>
    <h1 className='font-bold text-2xl'>Your cart is empty</h1>
    <p className=''>Looks like you haven't added anything to your cart yet.Start exploring our products!</p>
      <Link href={'/'}>
        <Button className='bg-green text-white p-5'>Start Shopping</Button>
    </Link>
    </div>
  )
}
