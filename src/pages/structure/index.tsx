import StructureTable from "@/components/structure/StructureTable"
import AuthContext from "@/context/authContext";
import { useContext } from "react";
export default function Home() {
  const {user} = useContext(AuthContext)
  const context = useContext(AuthContext)
  return (
    <>
      <StructureTable />
            {/*@ts-ignore*/}
            {user ? <span>{user?.username}</span> : "user giriş yapmamış"}
    </>
  )
}
