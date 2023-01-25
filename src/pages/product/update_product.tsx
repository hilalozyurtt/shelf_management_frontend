import UpdateProductForm from "@/components/product/UpdateForm";
import { useRouter } from 'next/router'
import AuthContext from "@/context/authContext";
import { useContext } from "react";

export default function UpdateProduct(props: any){
  const router = useRouter()
  let id;
  if(router.isReady){
    id = router.query.id?.toString()
  }
  const {user} = useContext(AuthContext)
  const context = useContext(AuthContext)
  if(!user && router.isReady){
    router.push('/')
    return(<></>)
  }else{
    return(
      <>
        {/*@ts-ignore*/}
        { id ? <UpdateProductForm productId={id}/> : ""}
      </>
    )
  }
}