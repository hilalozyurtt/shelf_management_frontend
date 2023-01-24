import UpdateShelfForm from "@/components/shelf/UpdateForm";
import { useRouter } from 'next/router'
import AuthContext from "@/context/authContext";
import { useContext } from "react";

export default function UpdateShelf(props: any){
  const router = useRouter()
  let id;
  if(router.isReady){
    id = router.query.id?.toString()
  }
  const {user} = useContext(AuthContext)
  const context = useContext(AuthContext)
  if(!user && router.isReady){
    router.push('/')
  }else{
    return(
      <>
        {/*@ts-ignore*/}
        { id ? <UpdateShelfForm shelfId={id}/> : ""}
      </>
    )
  }

}