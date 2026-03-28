import { getToken } from "@/utilites/getToken"
import { Interface } from "readline";

export async function getAddresses(){
    const token=await getToken();
    const data=await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`,{
        headers:{
            token:token?.token!
        }
    })
    const res=data.json();
    

    return res;
}
