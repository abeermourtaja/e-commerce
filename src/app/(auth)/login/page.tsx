import Image from "next/image";
import LoginForm from "./loginForm/LoginForm";
import { TbTruckDelivery } from "react-icons/tb";
import { IoTime } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";


export default function Login() {
 
  return (
    <div className='flex w-4/5 mx-auto py-9 gap-7 my-4 '>
      <div className="flex flex-col gap-3 w-1/2 my-20">
        <div className='flex flex-col '>
            <Image className="rounded-xl shadow-lg w-full object-cover h-[400px]" src={'/assets/login.png'} alt="login-img" height={200} width={200}></Image>
          </div>
          <h1 className=" text-3xl font-semibold text-center text-[#1e2939]">FreshCart - Your One-Stop Shop for Fresh Products</h1>
          <p className="text-center text-[#4a5565] ">Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
          <div className="flex justify-around">
            <div className="flex items-center gap-1 text-[#6A7282] text-sm ">
              <TbTruckDelivery className="text-green"/>
              Free Delivery
            </div>
            <div className="flex items-center gap-1 text-[#6A7282] text-sm ">
              <MdOutlineSecurity  className="text-green"/>
              Secure Payment

            </div>
            <div className="flex items-center gap-1 text-[#6A7282] text-sm ">
              <IoTime  className="text-green"/>
              24/7 Support
            </div>
          </div>
      </div>    
          <div className="flex flex-col gap-7 shadow-lg rounded-xl  p-5 w-1/2">
            <div className="text-center flex flex-col gap-3">
                <h1 className='font-bold text-3xl'>Fresh <span className="text-green">Cart</span></h1>
                <h1 className='font-bold text-3xl'>Welcome back!</h1>
                <p>Sign in to continue your fresh shopping experience</p>
                <LoginForm></LoginForm>
            </div>
          </div>
        </div>
  )
}
