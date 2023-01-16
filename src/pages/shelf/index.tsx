import CreateShelfForm from "@/components/shelf/CreateForm"
import ShelfTable from "@/components/shelf/ShelfTable"
import UpdateShelfForm from "@/components/shelf/UpdateForm"
import { useState } from "react"

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
        Raf Yeri Yönetimi
      </h1>
      <hr />
      <button onClick={() => {
        setShowComp({ table: false, updateForm: false, createForm: true })
      }}>Raf Yeri Oluştur</button>
      {showComp.table ? <ShelfTable updateState={updateState} /> : ""}
      {showComp.createForm ? <CreateShelfForm setShowComp={setShowComp}/> : ""}
      {showComp.updateForm ? <UpdateShelfForm setShowComp={setShowComp} shelfId={willUpdate}/> : ""}
      
      
    </>
  )
}
