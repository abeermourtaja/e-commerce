'use client'
import { resetPassword } from '@/api/resetPassword'
import { updateUser } from '@/api/updateUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaLock, FaSave, FaUser } from 'react-icons/fa'

export default  function Settings() {
  const {data:session}= useSession()
  const useClient=useQueryClient();
  const { data:password,mutate, isPending } = useMutation({
  mutationFn: resetPassword,
  onSuccess: () => {
    useClient?.invalidateQueries();
  },
})
  const { register, handleSubmit, } = useForm({
  defaultValues: {
    currentPassword: '',
    password:'',
    rePassword: '',
  },
})
const { data:updateUserData,mutate:updateUserMutate } = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    useClient?.invalidateQueries();
  },
})
console.log(updateUserData)
  const { register:user, handleSubmit:handleUserSubmit } = useForm({
  defaultValues: {
    name: session?.user?.name,
    email:session?.user?.email,
    phone: '',
  },
})

  return (
    <div>
       <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold">Account Settings</h1>
        <p className="text-sm text-gray-500">Update your profile information and change your password</p>
      </div>

      {/* Profile Information Card */}
      <div className="rounded-2xl border border-border bg-white p-6 space-y-5">

        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fdf4]">
            <FaUser className="text-green text-lg" />
          </div>
          <div>
            <h2 className="font-bold text-base">Profile Information</h2>
            <p className="text-sm text-gray-500">Update your personal details</p>
          </div>
        </div>

        {/* Error Banner */}
        {updateUserData?.message &&<div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{updateUserData?.message}</p>
        </div>}

        {/* Fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input {...user('name')} id="name" defaultValue="Abeer Mourtaja" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
            {...user('email')}
              id="email"
              className="bg-[#f0f4ff] text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              {...user('phone')}
              id="phone"
              className="bg-[#f0f4ff] text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <Button onClick={handleUserSubmit((data)=>{updateUserMutate(data)})} className="flex items-center gap-2 py-5 bg-green px-6 text-white">
          <FaSave className="text-sm" />
          Save Changes
        </Button>
      </div>

      {/* Change Password Card */}
      <div className="rounded-2xl border border-border bg-white p-6 space-y-5">

        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fdf4]">
            <FaLock className="text-green text-lg" />
          </div>
          <div>
            <h2 className="font-bold text-base">Change Password</h2>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
        </div>
        {password?.message &&<div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{password?.message}</p>
        </div>}
        {/* Fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input {...register('currentPassword')} id="currentPassword" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="newPassword">New Password</Label>
            <Input {...register('password')} id="newPassword" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input {...register('rePassword')} id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
        </div>

        <Button onClick={handleSubmit((data)=>mutate(data))}  className="flex items-center gap-2 py-5 bg-green px-6 text-white">
          <FaSave className="text-sm" />
          Save Changes
        </Button>
      </div>

    </div>
    </div>
  )
}
