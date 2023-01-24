import SystemLogTable from "@/components/system_log/SystemLogTable"
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
        <SystemLogTable />
      </>
    )
  }
}
