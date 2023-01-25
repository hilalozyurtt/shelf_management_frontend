import UpdateSystemForm from "@/components/settings/UpdateForm";
import { useRouter } from 'next/router'

export default function UpdateSystemParam(props: any) {
  const router = useRouter()
  let id;
  if (router.isReady) {
    id = router.query.id?.toString()
  }

  return (
    <>
      {/*@ts-ignore*/}
      {id ? <UpdateSystemForm _id={id} /> : ""}
    </>
  )
}
