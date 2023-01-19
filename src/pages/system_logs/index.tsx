import SystemLogTable from "@/components/system_log/SystemLogTable"
import AuthContext from "@/context/authContext";
import { useContext } from "react";
export default function Home() {
  const {user} = useContext(AuthContext)
  const context = useContext(AuthContext)
  return (
    <>
      <SystemLogTable />

    </>
  )
}
