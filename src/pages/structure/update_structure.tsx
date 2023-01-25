import UpdateStructureForm from "@/components/structure/UpdateForm";
import { useRouter } from 'next/router'


export default function UpdateStructure(props: any) {
  const router = useRouter()

  let id;
  if (router.isReady) {
    id = router.query.id?.toString()
  }

  return (
    <>
      {/*@ts-ignore*/}
      {id ? <UpdateStructureForm structureId={id} /> : ""}
    </>
  )

}