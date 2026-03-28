"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navigation, Pagination } from "swiper/modules"

export default function Swipper() {
    
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      loop
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true ,bulletActiveClass:`bg-white! opacity-100! w-8! rounded-xl! h-3!`}}      
    >
        <SwiperSlide >
          <div  className="relative h-[400px] w-full ">
            <Image className="h-[400px] w-full object-cover object-center" src={'/assets/slide.png'} alt="sliderImage" width={2000} height={600} quality={100}  priority/>
            <div className="absolute inset-0  bg-green/70 "></div>
            <div className="flex flex-col absolute top-35 left-30 gap-2">
                <h1 className="font-bold text-4xl text-white ">Fast & Free Delivery</h1>
                <p className="font-bold text-white">Same day delivery available</p>
                <div className="flex gap-3 font-semibold">
                  <Button className="p-5 bg-white text-green" >Order Now</Button>
                  <Button className="p-5 bg-transparent border-1 border-white ">Delivey Info</Button>
                </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide >
          <div className="relative h-[400px] w-full ">
            <Image className="h-[400px] w-full object-cover object-center" src={'/assets/slide.png'} alt="sliderImage" width={200} height={200}   priority/>
            <div className="absolute inset-0  bg-green/70 "></div>
            <div className="flex flex-col absolute top-35 left-30 gap-2">
                <h1 className="font-bold text-4xl text-white w-3/4">Premium Quality Guaranteed </h1>
                <p className="font-bold text-white">Fresh from farm to your table</p>
                <div className="flex gap-3 font-semibold">
                  <Button className="p-5 bg-white text-green" >Order Now</Button>
                  <Button className="p-5 bg-transparent border-1 border-white ">Delivery Info</Button>
                </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide >
          <div className="relative h-[400px] w-full ">
            <Image className="h-[400px] w-full object-cover object-center" src={'/assets/slide.png'} alt="sliderImage" width={2000} height={600} quality={100}  priority/>
            <div className="absolute inset-0  bg-green/70 "></div>
            <div className="flex flex-col absolute top-35 left-30 gap-2">
                <h1 className="font-bold text-4xl text-white w-3/4">Fresh Products Delivered to your Door</h1>
                <p className="font-bold text-white">Get 20% off your first order</p>
                <div className="flex gap-3 font-semibold">
                  <Button className="p-5 bg-white text-green" >Shop Now</Button>
                  <Button className="p-5 bg-transparent border-1 border-white ">View Deals</Button>
                </div>
            </div>
          </div>
        </SwiperSlide>
    </Swiper>
  )
}