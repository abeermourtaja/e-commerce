'use client'
import getCategories from '@/api/getCategories'
import ProductDetails from '@/app/products/[id]/page'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { useQuery } from '@tanstack/react-query'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBoxOpen, FaHeart, FaRegAddressBook, FaRegHeart, FaRegUser, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { FaCartShopping, FaGear } from 'react-icons/fa6'
import { FiUser } from 'react-icons/fi'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { CgProfile } from "react-icons/cg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'


export default function Navbar() {
    const router = useRouter();

async function logoutFn() {
  await signOut({ redirect: false });
  router.push("/login");
}
    const {data:cart,isPending}=useQuery({
    queryKey:['cart'],
    queryFn:async()=>{
      const data=await fetch(`api/cart`);
      return data.json();
    }
  });
  const {data:categories}=useQuery({
    queryKey:['categories'],
    queryFn:async()=>{
      const categories=await getCategories();
      return categories.data;
    }
  });
  console.log(categories)
    const {status,data}=useSession()
    console.log(status)
  return (
    <div className=' border-bottom-1 shadow-md'>
        <nav className='w-4/5 mx-auto py-4 flex gap-5 items-center'>
        <div className='flex gap-3 items-center bg-red'>
            <Image className='size-7' width={45} height={45} src="/assets/logo.png" alt="logo" />
            <p className='text-red font-bold text-[26px] font-sans text-[#1A202C] '>FreshCart</p>
        </div>
        <div>
           <input className='rounded-2xl border-border border-1 p-2 w-[350px] ' type="text" placeholder='Search for products, brands and more...' />            
        </div>
            <NavigationMenu>
                <NavigationMenuList className='font-semibold'>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild >
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild >
                            <Link href="/products">Shop</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                            <NavigationMenuContent className='flex flex-col gap-2 p-3 '>
                                <NavigationMenuLink href='/categories' className='w-[150px] '>All Categories</NavigationMenuLink>
                                <NavigationMenuLink href='/categories/6439d2d167d9aa4ca970649f' className='w-[150px] '>Electroinc</NavigationMenuLink>
                                <NavigationMenuLink href='/categories/6439d58a0049ad0b52b9003f' className='w-[150px] '>Women's Fashion</NavigationMenuLink>
                                <NavigationMenuLink href='/categories/6439d5b90049ad0b52b90048' className='w-[150px] '>Men's Fashion</NavigationMenuLink>
                                <NavigationMenuLink href='/categories/6439d30b67d9aa4ca97064b1' className='w-[150px] '>Beauty & Health</NavigationMenuLink>
                            </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild >
                            <Link href="/brands">Brands</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild >
                            <Link href="/contact">
                                <div className='flex gap-3'>
                                    <div className='bg-[#ECFDF5] size-10 rounded-full flex justify-center items-center'>
                                       <TfiHeadphoneAlt  className='text-green'/>
                                    </div>
                                    <div className='flex flex-col gap-1 font-medium text-[12px]'>
                                        <p className=' text-gray-400'>Support</p>
                                        <h5>24/7 Help</h5>
                                    </div>
                                </div>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                   
                </NavigationMenuList>

            </NavigationMenu>
            <div className='flex gap-5 items-center justify-end ms-3'>
                {status!=='unauthenticated' && <Link href="/wishlist">
                    <FaRegHeart className='hover:text-green size-5 text-[#6a7282]'/> 
                </Link>}
                {status!=='unauthenticated' &&<Link className='relative' href="/cart">
                    <div className="absolute size-3 bg-green text-[8px] font-bold text-white flex items-center justify-center p-1 rounded-full left-3 bottom-3">{cart?.numOfCartItems>9?'9+':cart?.numOfCartItems}</div>
                    <FaCartShopping className='hover:text-green size-5 text-[#6a7282]'/> 
                </Link>}
                {status==='unauthenticated'? <Link  href="/login">
                    <Button className='bg-green rounded-2xl p-5 font-semibold'><FiUser /> Sign in</Button>
                </Link>:
                <DropdownMenu>
                    <DropdownMenuTrigger className='border-none' asChild>
                        <Button variant="outline"><CgProfile className='hover:text-green size-5 text-[#6a7282] '/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent  className='w-65'>
                        <DropdownMenuGroup className='p-3 '>
                            <DropdownMenuLabel className='font-bold flex items-center gap-2 text-black text-sm gap-2 my-2'>
                            <div className='bg-[#dcfce7] flex items-center justify-center size-8 rounded-full'> <CgProfile className='text-green size-5 '/></div> 
                            <div className='flex flex-col'>
                                <h1>{data?.user?.name}</h1>
                                <p className='font-medium text-gray-500 text-xs'>{data?.user?.email}</p>
                            </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator></DropdownMenuSeparator>
                            <Link href={'/profile/addresses'}> <DropdownMenuItem className='text-[#4a5565] p-3 font-medium text-sm flex items-center gap-2'><FaRegUser className='text-[#99a1af]'/> My Profile</DropdownMenuItem></Link>
                            <Link href={'/allorders'}><DropdownMenuItem className='text-[#4a5565] p-3 font-medium text-sm flex items-center gap-2'><FaBoxOpen className='text-[#99a1af]'/> My Orders</DropdownMenuItem></Link>
                            <Link href={'/wishlist'}><DropdownMenuItem className='text-[#4a5565] p-3 font-medium text-sm flex items-center gap-2'><FaRegHeart className='text-[#99a1af]'/> My Wishlist</DropdownMenuItem></Link>
                            <Link href={'/profile/addresses'}><DropdownMenuItem className='text-[#4a5565] p-3 font-medium text-sm flex items-center gap-2'><FaRegAddressBook className='text-[#99a1af]'/> My Addresses</DropdownMenuItem></Link>
                            <Link href={'/profile/settings'}><DropdownMenuItem className='text-[#4a5565] p-3 font-medium text-sm flex items-center gap-2'><FaGear className='text-[#99a1af]'/> Settings</DropdownMenuItem></Link>
                            <DropdownMenuSeparator></DropdownMenuSeparator>
                            <DropdownMenuItem onClick={()=>{logoutFn()}} className='text-[#fb2c36] p-3 font-medium text-sm flex items-center gap-2'><FaSignOutAlt />Sign out</DropdownMenuItem>   
                        </DropdownMenuGroup>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
                }
            </div>
        </nav>
    </div>
  )
}
