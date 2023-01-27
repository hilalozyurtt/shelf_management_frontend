import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import UpdateUserPass from '../../components/users/UpdatePass';


export default function UpdateUserAdmin(props: any) {
  const { user } : any= useContext(AuthContext)
  const router = useRouter()
  let id;
  if (router.isReady) {
    id = router.query.id?.toString()
  }
  if(user && user.role == "admin"){
    return (
      <>
        <UpdateUserPass userId={id} />
      </>
    )
  }else{
    return (<>
      <div>Bu sayfa sadece adminlere açıktır.</div>
      <Link href={"/"}>Ana Sayfaya Dön</Link>
    </>)
  }

}