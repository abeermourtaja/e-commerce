import { Button } from "@/components/ui/button";
import Navbar from "./_components/navbar/Navbar";
import ProductItem from "./_components/proudctItem/ProductItem";
import getProducts from "@/api/getProducts";
import { Category, ProductList } from "@/Interfaces/Products.interface";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import getCategories from "@/api/getCategories";
import CategoryItem from "./_components/categoryItem/CategoryItem";
import Swipper from "./_components/shared/Swiper";
export default async function Home() {
  const dataProducts=await getProducts();
  const products=dataProducts?.data;
  const dataCategories=await getCategories();
  const categories: Category[]=dataCategories?.data ;
  return (
    <div>
      <Swipper></Swipper>
      <div className="container m-4/5 mx-auto my-3">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl my-3">Shop By <span className="text-green">Category</span></h1>
          <Link className="text-green flex  items-center gap-2" href={'/categories'}>View All Categories <FaArrowRight /></Link>
          
        </div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
           {categories.map((cat:Category)=>{
            return <CategoryItem key={cat._id} category={cat}/>
          })}
        </div>
        <h1 className="font-bold text-3xl my-6">Featured <span className="text-green">Products</span></h1>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 my-4">
          {products.map((prod:ProductList)=>{
            return <ProductItem key={prod._id} product={prod} />
          })}
        </div>
      </div>
    </div>
  );
}
