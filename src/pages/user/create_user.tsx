import UpdateUserForm from "@/components/user/UpdateForm";
import { useRouter } from 'next/router'

export default function UpdateUser(props: any) {
  const router = useRouter()
  let id;
  if (router.isReady) {
    id = router.query.id?.toString()
  }
  return (
    <>
      {/*@ts-ignore*/}
      {id ? <UpdateUserForm userId={id} /> : ""}
    </>
  )
}