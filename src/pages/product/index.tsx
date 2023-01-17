import CreateProductForm from "@/components/product/CreateForm"
import ProductTable from "@/components/product/ProductTable"
import UpdateProductForm from "@/components/product/UpdateForm"
import Link from "next/link"
import { useState } from "react"


export default function Home() {

  return (
    <>
      <h1 className="text-2xl font-bold ">
        Ürün Yönetimi
      </h1>
      <hr />
      <Link href={"/product/create_product"}>Ürün Oluştur</Link>
      <ProductTable />
    </>
  )
}
