import CreateShelfForm from "@/components/shelf/CreateForm"
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { useRouter } from 'next/router';

export default function CreteShelf(props: any){
  const router = useRouter()

  return(
    <>
      <CreateShelfForm />
    </>
  )
}