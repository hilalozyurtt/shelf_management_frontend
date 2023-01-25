import StructureTable from "@/components/structure/StructureTable"


export default function Home() {

  return (
    <div className="overflow-auto">
      <h1 className="text-2xl font-bold ">
        Bina Yönetimi
      </h1>
      <hr />
      <StructureTable />
    </div>
  )
}
