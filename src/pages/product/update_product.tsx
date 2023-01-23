import UpdateProductForm from "@/components/product/UpdateForm";
import { useRouter } from 'next/router'
import {useState} from 'react';

export default function UpdateProduct(props: any){
  const router = useRouter()
  let id;
  if(router.isReady){
    id = router.query.id?.toString()
  }
  return(
    <>
      {/*@ts-ignore*/}
      { id ? <UpdateProductForm productId={id}/> : ""}
      
    </>
  )
}