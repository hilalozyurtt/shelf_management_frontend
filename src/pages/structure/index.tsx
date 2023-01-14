import { DELETE_STRUCTURE, STRUCTURE_LIST } from "@/apollo/resolvers/productResolvers"
import UpdateStructureForm from "@/components/updateForm/UpdateStructureForm"
import Table from "@/components/Table/Table"
import { useQuery, useMutation, gql } from "@apollo/client"
import { useState } from "react"
import CreateForm from "@/components/structure/createForm/CreateForm"

type showCompState = {
  table:boolean,
  createForm:boolean,
  updateForm:boolean
}

type willUpdate = {
  id:string
}

export default function Home() {
  const [showComp, setShowComp] = useState<showCompState>({table:true, createForm: false, updateForm: false})
  const [willUpdate, setWillUpdate] = useState<willUpdate>({id:""})
  const {data, loading, error} = useQuery(STRUCTURE_LIST)
  const [deleteStructure, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_STRUCTURE)
  const deleteDataFromTable = (id:any)=>{
    deleteStructure({variables:{
      input:{ _id:id}
    }, refetchQueries:[STRUCTURE_LIST]})
  }
  const updateState = (id: string)=>{
    setWillUpdate({id:id})
    setShowComp({table:false,createForm:false,updateForm:true})
  }
  if(loading) return <div>loading</div>
  if(error) return <div>error</div>
  return (
    <>
    <h1 className="text-2xl font-bold ">
      Bina Yönetimi
    </h1>
    <hr/>
    <button onClick={()=>{
      setShowComp({table:false, updateForm:false, createForm:true})
    }}>Bina Oluştur</button>
    {showComp.table ? <Table data={data?.getAllStructures} deleteFunc={deleteDataFromTable} updateState={updateState}/> : ""}
    {showComp.updateForm ? <UpdateStructureForm structureId={willUpdate} setShowComp={setShowComp}/> : ""}
    {showComp.createForm ? <CreateForm  setShowComp={setShowComp}/> : ""}
    </>
  )
}
