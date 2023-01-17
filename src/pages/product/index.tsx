import ProductTable from "@/components/product/ProductTable"
import Link from "next/link"


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
