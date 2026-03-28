'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaArrowLeftLong, FaCircleInfo } from 'react-icons/fa6'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { AiFillHome } from "react-icons/ai";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { FaReceipt } from 'react-icons/fa'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendCheckout } from '@/api/checkout/postCheckout'
import { useParams } from 'next/navigation'
import { addressSchema, addressSchemaType } from './schema/address.schema'
import { useQuery } from '@tanstack/react-query'
import { Cart } from '@/Interfaces/cart.interface'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import Image from 'next/image'
import { ProductList } from '@/Interfaces/Products.interface'
export default function Checkout({cartId}:{cartId:string}) {
  const {control,handleSubmit}=useForm<addressSchemaType>({
    resolver:zodResolver(addressSchema),
    defaultValues:{
      city:'',
      details:'',
      phone:'',
    }
  });
  const {data:cart,isPending}=useQuery({
    queryKey:['cart'],
    queryFn:async()=>{
      const data=await fetch(`api/cart`);
      const payload:Promise<Cart>=data.json();
      return payload;
    }
  });
  const delivery=cart?.data?.totalCartPrice!>500?0:50;
  console.log(cart)
  async function checkout(dataAddress:addressSchemaType){
    const data=await sendCheckout(dataAddress,cart?.cartId!);
    if(data.status==='success'){
        window.location.href=data.session.url
    }
    console.log(dataAddress)
    console.log(data)
  }
  return (
    <div className='p-2 xl:w-4/5 mx-auto my-4 w-full'>
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <div className="bg-green p-2 rounded-xl">
            <FaReceipt className='text-white text-2xl' />
          </div>
        <h1 className='font-bold text-3xl '>Complete Your Order</h1>
        </div>
        <Link className='text-green flex items-center gap-2' href={'/cart'}><FaArrowLeftLong /> Back to Cart</Link>
      </div>
      <p className='font-medium text-gray-500'> Review your items and complete your purchase</p>
      <div className="flex flex-col lg:flex-row gap-4 items-start my-3">
        <div className="lg:w-2/3 w-full border border-border rounded-xl bg-white stick top-10">
        <div className='bg-green text-white p-5 rounded-t-xl font-bold flex flex-col '>
          <div className='flex gap-1'><AiFillHome className='text-xl' />Shipping Address</div> 
            <p className='font-medium text-xs text-[#dcfce7]'>Where should we deliver your order?</p>
        </div>
        <div className='p-3 flex flex-col gap-5'>
          <div className="flex gap-3 border-[#dbeafe] bg-[#eff6ff] p-5 rounded-xl">
            <div className="size-9 bg-[#dbeafe] rounded-full flex justify-center items-center ">
              <FaCircleInfo className='text-[#155dfc] ' />
            </div>
            <div className="flex flex-col ">
              <h1 className='semibold'>Delivery Information</h1>
              <h1 className='text-[#155dfc] font-medium text-sm'>Please ensure your address is accurate for smooth delivery</h1>
            </div>
           
          </div>
           <form onSubmit={handleSubmit(checkout)} action="">
              <FieldGroup>
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>City *</FieldLabel>
                  <Input
                    className='p-5'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    autoComplete="off"
                  />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
              )}
            />
            <Controller
              name="details"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Street Address *</FieldLabel>
                  <Input
                    className='p-5'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Street name, building number, floor, apartment..."
                    autoComplete="off"
                  />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number *</FieldLabel>
                  <Input
                    className='p-5'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="01xxxxxxxxx"
                    autoComplete="off"
                  />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
              )}
            />
          </FieldGroup>
          </form>
      </div>
      
      </div>
      <div className="lg:w-1/3 w-full border border-border rounded-xl bg-white stick top-10">
        <div className='bg-green text-white p-5 rounded-t-xl font-bold '>Order Summary</div>
        <div className='p-3 flex flex-col gap-3'>
          <ScrollArea className="h-72 w-full rounded-md ">
          <div className="p-4">
             <ItemGroup className="max-w-sm">
              {cart?.data?.products?.map((product) => (
                <Item key={product?.product?._id} variant="outline">
                  <ItemMedia>
                    <Image  src={product?.product?.imageCover} alt={product?.product?.title} height={32} width={32}></Image>
                  </ItemMedia>
                  <ItemContent className="gap-1">
                    <ItemTitle>{product?.product?.title}</ItemTitle>
                    <ItemDescription className='text-xs font-semibold'>{product?.count}x{product?.price}</ItemDescription>
                  </ItemContent>
                  <ItemContent>
                    <h1 className='font-bold'>{product?.price*product.count}</h1>
                  </ItemContent>
                </Item>
              ))}
    </ItemGroup>
          </div>            
        </ScrollArea>
          <div className="flex justify-between text-[#4a5565] font-semibold">
            <p>Subtotal ({cart?.numOfCartItems} items)</p>
            <p>{cart?.data?.totalCartPrice} EGP</p>
          </div>
          <div className="flex justify-between text-[#4a5565] font-semibold">
            <p>Shipping</p>
            <p className='text-green'>{delivery==0 ?'Free':'50 EGP'}</p>
          </div>
          <hr />
          <div className="flex justify-between ">
            <p className='font-bold text-xl'>Estimated Total</p>
            <p className='text-green font-bold'>{(cart?.data?.totalCartPrice)!+delivery} EGP</p>
        </div>
        <Button onClick={handleSubmit(checkout)} className='bg-green font-bold p-6 w-full'>Place Order</Button>
        <hr />
        </div>
      </div>
    </div>
    </div>
  )
}
