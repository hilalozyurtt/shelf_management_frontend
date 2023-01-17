import UpdateProductForm from "@/components/product/UpdateForm";
import { useRouter } from 'next/router'

export default function UpdateProduct(props: any){
  const router = useRouter()
  let id;
  if(router.isReady){
    id = router.query.id?.toString()
  }
  return(
    <>
      <UpdateProductForm shelfId={id}/>
    </>
  )
}