import StructureTable from "@/components/structure/StructureTable"
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const {user} = useContext(AuthContext)
  const context = useContext(AuthContext)
  if(!user && router.isReady){
    router.push('/')
    return(<></>)
  }else{
    return (
      <>
        <h1 className="text-2xl font-bold ">
          Bina Yönetimi
        </h1>
        <hr />
        <StructureTable />
              {/*@ts-ignore*/}
              {user ? <span>{user?.username}</span> : "user giriş yapmamış"}
      </>
    )
  }
}
