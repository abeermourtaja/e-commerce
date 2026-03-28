'use client'
import { addAddress } from '@/api/addresses/addAddress'
import { deleteAddress } from '@/api/addresses/deleteAddress'
import { getAddresses } from '@/api/addresses/getAddresses'
import { addressSchema } from '@/app/checkout/schema/address.schema'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Label } from '@/components/ui/label'
import { Address } from '@/Interfaces/address.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BadgeCheckIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaCity, FaEdit, FaPhone, FaPhoneAlt, FaPlus, FaTrash } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdModeEdit } from 'react-icons/md'

export default function Addresses() {
  const useClient=useQueryClient();
  const {data,isPending}= useQuery({
    queryKey:['address'],
    queryFn: getAddresses,
  });
  const {register,handleSubmit,formState:{ errors }}=useForm({
    resolver:zodResolver(addressSchema),
    defaultValues:{
      city:'',
      details:'',
      phone:'',
      name:''
    }
  });
  const {mutate}=useMutation({
    mutationKey:['address'],
    mutationFn:addAddress,
    onSuccess:async()=>{
      await useClient.invalidateQueries({queryKey:['address']})
    }
  })
   const {mutate:deleteAddressMutate}=useMutation({
    mutationKey:['address'],
    mutationFn:deleteAddress,
    onSuccess:async()=>{
      await useClient.invalidateQueries({queryKey:['address']})
    }
  })
  const addresses=data?.data;
  return (
    <div>
      <div className='flex justify-between ' >
        <div className="flex flex-col">
          <h1 className='font-bold text-xl'>My Addresses</h1>
          <p className='font-medium text-gray-500'>Manage your saved delivery addresses</p>
        </div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className='bg-green text-white p-5 border-none outline-none' ><FaPlus></FaPlus>Add Address</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle className='font-bold text-lg'>Add New Address</DialogTitle>
                  
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="addressName">Address Name</Label>
                    <Input {...register('name')} id="addressName" name="name" placeholder='e.g. Home, Office'  />
                    <p className="text-xs text-red-500">{errors?.name?.message}</p>
                  </Field>
                  <Field>
                    <Label htmlFor="FullAddress">Full Address</Label>
                    <Input {...register('details')} id="FullAddress" name="details" placeholder='Street, building, apartment...' />
                      <p className="text-xs text-red-500">{errors?.details?.message}</p>

                  </Field>
                  <div className="flex gap-2">
                     
                   <Field>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input {...register('phone')} id="phone" name="phone" placeholder="01xxxxxxxx" />
                    <p className="text-xs text-red-500">{errors?.phone?.message}</p>
                  </Field>
                   <Field>
                    <Label htmlFor="city">City</Label>
                    <Input {...register('city')} id="city" name="city" placeholder="Cairo" />
                    <p className="text-xs text-red-500">{errors?.city?.message}</p>
                  </Field>
                  </div>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button className='p-5 bg-[#f3f4f6] ' variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleSubmit((data)=>mutate(data))} className='p-5 bg-green' type="submit">Add Address</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        <div className="flex flex-wrap gap-2">
          {addresses?.map((address:Address)=>{
            return <div key={address?._id} className="flex justify-between border border-border rounded-xl w-full md:w-[48%] shadow-lg p-4 my-2">
          <div className="flex gap-2">
             <div className="rounded-lg size-10 flex items-center justify-center bg-[#f0fdf4]">
                <FaLocationDot className='text-green'/>
             </div>
             <div className="flex flex-col">
              <h1 className='font-bold text-lg'>{address?.name}</h1>
              <h1 className='font-medium text-sm text-gray-500'>{address?.details}</h1>
              <div className="flex gap-4 my-2">
                <p className='flex gap-1 items-center text-gray-500 text-sm font-medium'><FaPhoneAlt /> {address?.phone}</p>
                <p className='flex gap-1 items-center text-gray-500 text-sm font-medium'><FaCity/> {address?.city}</p>
              </div>
             </div>
          </div>
            <div className="flex items-center gap-2">
              
              <Button onClick={()=>{deleteAddress(address?._id)}} className="bg-[#f3f4f6]">
                <FaTrash className='text-[#4a5565]'/>
              </Button>
            </div>
          </div>
          })}
          
        </div>
        
    </div>
  )
}
