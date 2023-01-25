import UpdateUserPassForm from "@/components/user/UpdatePass";
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
      {id ? <UpdateUserPassForm userId={id} /> : ""}
    </>
  )
}