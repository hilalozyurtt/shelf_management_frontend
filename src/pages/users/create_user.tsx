import CreateUserForm from "@/components/users/CreateForm";
import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useContext } from "react";


export default function CreateUser(props: any) {
  const { user } : any= useContext(AuthContext)
  if(user && user.role == "admin"){
    return (
      <>
        <CreateUserForm />
      </>
    )
  }else{
    return (<>
      <div>Bu sayfa sadece adminlere açıktır.</div>
      <Link href={"/"}>Ana Sayfaya Dön</Link>
    </>)
  }

}