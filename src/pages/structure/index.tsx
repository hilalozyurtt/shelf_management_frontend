import UpdateStructureForm from "@/components/structure/updateForm/UpdateStructureForm"
import { useState } from "react"
import CreateForm from "@/components/structure/createForm/CreateForm"
import StructureTable from "@/components/structure/structureTable/StructureTable"

type showCompState = {
  table: boolean,
  createForm: boolean,
  updateForm: boolean
}

type willUpdate = {
  id: string
}

export default function Home() {
  const [showComp, setShowComp] = useState<showCompState>({ table: true, createForm: false, updateForm: false })
  const [willUpdate, setWillUpdate] = useState<willUpdate>({ id: "" })

  const updateState = (id: string) => {
    setWillUpdate({ id: id })
    setShowComp({ table: false, createForm: false, updateForm: true })
  }
  return (
    <>
      <h1 className="text-2xl font-bold ">
        Bina Yönetimi
      </h1>
      <hr />
      <button onClick={() => {
        setShowComp({ table: false, updateForm: false, createForm: true })
      }}>Bina Oluştur</button>
      {showComp.table ? <StructureTable updateState={updateState} /> : ""}
      {showComp.updateForm ? <UpdateStructureForm structureId={willUpdate} setShowComp={setShowComp} /> : ""}
      {showComp.createForm ? <CreateForm setShowComp={setShowComp} /> : ""}
    </>
  )
}
