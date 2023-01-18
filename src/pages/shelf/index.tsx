import CreateShelfForm from "@/components/shelf/CreateForm"
import ShelfTable from "@/components/shelf/ShelfTable"
import UpdateShelfForm from "@/components/shelf/UpdateForm"
import Link from "next/link"
import { useState } from "react"

export default function Home() {

  return (
    <>
      <h1 className="text-2xl font-bold ">
        Raf Yeri Yönetimi
      </h1>
      <hr />
      <ShelfTable />
     
    </>
  )
}
