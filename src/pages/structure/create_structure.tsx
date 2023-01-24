import CreateStructureForm from "@/components/structure/CreateForm"
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { useRouter } from 'next/router';

export default function CreteStructure(props: any) {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const context = useContext(AuthContext)
  if (!user && router.isReady) {
    router.push('/')
  } else {
    return (
      <>
        <CreateStructureForm />
      </>
    )
  }
}