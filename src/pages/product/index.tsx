import ProductTable from "@/components/product/ProductTable"

export default function Home() {

  return (
    <>
      <h1 className="text-2xl font-bold ">
        Ürün Yönetimi
      </h1>
      <hr />
      <ProductTable />
    </>
  )
}
