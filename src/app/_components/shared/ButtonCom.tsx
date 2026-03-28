'use client'
import { addCart } from '@/api/cart/addCart'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { toast } from 'sonner'

export default function ButtonCom({className,children,productId}:{className:string,children:ReactNode,productId:string}) {
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
  return (
    <Button onClick={()=>mutate(productId)} className={className}>{children}</Button>
  )
}
