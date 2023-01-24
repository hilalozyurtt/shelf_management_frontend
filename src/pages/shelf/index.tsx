import ShelfTable from "@/components/shelf/ShelfTable"
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const {user} = useContext(AuthContext)
  const context = useContext(AuthContext)

  if(!user && router.isReady){
    router.push('/')
  }else{
    return (
      <>
        <h1 className="text-2xl font-bold ">
          Raf Yeri Yönetimi
        </h1>
        <hr />
        <ShelfTable />
       
      </>
    )
  }
}
