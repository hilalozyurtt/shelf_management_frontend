import CreateForm from "@/components/product/CreateForm"
import ProductTable from "@/components/product/ProductTable"
import UpdateForm from "@/components/product/UpdateForm"
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
        Ürün Yönetimi
      </h1>
      <hr />
      <button onClick={() => {
        setShowComp({ table: false, updateForm: false, createForm: true })
      }}>Ürün Oluştur</button>
      {showComp.table ? <ProductTable updateState={updateState} /> : ""}
      {showComp.createForm ? <CreateForm setShowComp={setShowComp}/> : ""}
      {showComp.updateForm ? <UpdateForm setShowComp={setShowComp} productId={willUpdate}/> : ""}
      
      
    </>
  )
}
