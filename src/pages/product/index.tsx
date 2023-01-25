import ProductTable from "@/components/product/ProductTable"

export default function Home() {

  return (
    <div className="overflow-auto">
      <h1 className="text-2xl font-bold ">
        Ürün Yönetimi
      </h1>
      <hr />
      <ProductTable />
    </div>
  )
}
