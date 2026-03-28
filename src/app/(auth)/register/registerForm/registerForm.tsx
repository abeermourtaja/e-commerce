'use client'
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { registerSchema, registerSchemaType } from '../schema/register.schema';
import { registerFn } from '../actions/register.action';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
export default function RegisterForm() {
    const router=useRouter()
    const {control,handleSubmit}=useForm<registerSchemaType>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
        },
    });
    async function handleRegister(data:registerSchemaType){
      try{
        const registerSuccessful=await registerFn(data);
        console.log(registerSuccessful)
        if(registerSuccessful){
          toast.success('user created successfully',{
          position:'top-right',
         style: {
            background: "#22c55e", // green
            color: "white",
          },
          });
          setTimeout(()=>{
            router.push('/login')
          },500)
        }
      }
      catch(error:any){
        toast.error(error?.message,{
          position:'top-right',
          style: {
            background: 'red', // green
            color: "white",
          },
        })
      }
    }
  return (
    <form onSubmit={handleSubmit(handleRegister)}>
        <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                    Name*
                  </FieldLabel>
                  <Input
                    className='py-5'
                    {...field}
                    type='text'
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ali"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    Email*
                  </FieldLabel>
                  <Input
                    className='py-5'
                    {...field}
                    type='email'
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@gmail.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Password*
                  </FieldLabel>
                  <Input
                    className='py-5'
                    {...field}
                    type='password'
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="create a strong password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-rePassword">
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    className='py-5'
                    type='password'
                    {...field}
                    id="form-rhf-demo-rePassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-phone">
                    Phone number*
                  </FieldLabel>
                  <Input
                    className='py-5'
                    {...field}
                    type='tel'
                    id="form-rhf-demo-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="01501234567"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
            </FieldGroup>
            <Button className='w-full p-5 bg-green my-3 font-bold'>Create My Account</Button>
            <hr />
            <div className="my-5 font-medium">Already have an account <span className='text-green'>Sign in</span></div>
      
    </form>
  )
}
