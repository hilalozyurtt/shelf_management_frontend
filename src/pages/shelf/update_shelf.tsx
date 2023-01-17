import UpdateShelfForm from "@/components/shelf/UpdateForm";
import { useRouter } from 'next/router'

export default function UpdateShelf(props: any){
  const router = useRouter()
  let id;
  if(router.isReady){
    id = router.query.id?.toString()
  }
  return(
    <>
      <UpdateShelfForm shelfId={id}/>
    </>
  )
}