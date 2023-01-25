import UsersTable from "@/components/users/UsersTable"
import AuthContext from "@/context/authContext"
import { useContext } from "react"

export default function Home() {
  const { user } : any = useContext(AuthContext)

  if(user && user.role == 'admin'){
    return (
      <div className="overflow-auto">
        <h1 className="text-2xl font-bold ">
          Kullanıcı Listesi
        </h1>
        <hr />
        <UsersTable />
      </div>
    )
  }else{
    return <div>Bu sayfayı yanlızca adminler görebilir.</div>
  }
 

}
