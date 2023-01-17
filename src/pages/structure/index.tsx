import UpdateStructureForm from "@/components/structure/UpdateForm"
import { useState } from "react"
import CreateStructureForm from "@/components/structure/CreateForm"
import StructureTable from "@/components/structure/StructureTable"
import Link from "next/link"

export default function Home() {

  return (
    <>
      <h1 className="text-2xl font-bold ">
        Bina Yönetimi
      </h1>
      <hr />
      <Link href={"structure/create_structure"}>Bina Oluştur</Link>
      <StructureTable />
    </>
  )
}
