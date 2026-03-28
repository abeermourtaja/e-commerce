'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema, loginSchemaType } from '../schema/login.schema'
import { redirect, useRouter } from 'next/navigation'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginFn } from '../actions/login.action'
import { toast } from 'sonner'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginForm() {
    const router=useRouter()
    const{control,handleSubmit}=useForm<loginSchemaType>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email:'',
      password:'',
    },
  })
  async function handleLogin(data: loginSchemaType) {
  try {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success('Login Successful', {
        position: 'top-right',
        style: {
          color: 'white',
          background: 'green',
        },
      });
      router.push('/');
    } else {
      throw new Error(res?.error || 'Login failed');
    }
  } catch (error: any) {
    toast.error(error.message, {
      position: 'top-right',
      style: {
        color: 'white',
        background: 'red',
      },
    });
  }
}
  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col gap-2">
            <Button className='py-5 border-2 border-border bg-white text-[#364253]'><FaGoogle className='text-red-600'/>Continue with Google</Button>
            <Button className='py-5 border-2 border-border bg-white text-[#364153]'><FaFacebook className='text-blue-600'/>Continue with Facebook</Button>
        </div>
        
        <FieldGroup>
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

        </FieldGroup>
        <hr />
        <Button className='py-5 bg-green w-full my-3'>Sign In</Button>
        <div className="my-5 font-medium">New to FreshCart? <Link href='/register' className='text-green'>Create an account</Link></div>

    </form>
  )
}
