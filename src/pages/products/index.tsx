import { DELETE_STRUCTURE, STRUCTURE_LIST } from "@/apollo/resolvers/productResolvers"
import Table from "@/components/Table/Table"
import { useQuery, useMutation, gql } from "@apollo/client"


export default function Home() {
  const {data, loading, error} = useQuery(STRUCTURE_LIST)
  const [deleteStructure, {data: deleteData, loading: deleteLoading, error: deleteError}] = useMutation(DELETE_STRUCTURE)

  if(loading || deleteLoading) return <div>loading</div>
  if(error || deleteError) return <div>error</div>
  return (
    <>
    <h1 className="text-2xl font-bold ">
      Ürünler
    </h1>

    <Table data={data?.getAllStructures}/>
    </>
  )
}
