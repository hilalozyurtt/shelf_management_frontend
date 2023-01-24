import UpdateStructureForm from "@/components/structure/UpdateForm";
import { useRouter } from 'next/router'
import AuthContext from "@/context/authContext";
import { useContext } from "react";

export default function UpdateStructure(props: any) {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const context = useContext(AuthContext)
  let id;
  if (router.isReady) {
    id = router.query.id?.toString()
  }
  if (!user && router.isReady) {
    router.push('/')
  } else {
    return (
      <>
        {/*@ts-ignore*/}
        {id ? <UpdateStructureForm structureId={id} /> : ""}
      </>
    )
  }
}