import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from '@/modules/resolvers/productResolvers'
import { useMutation, useQuery } from '@apollo/client'
import react from 'react'


export default function ProductTable(props:any) {
    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
    const [deleteProduct, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_PRODUCT)
  
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>
    return(
        <>
        <div className="relative overflow-x-auto mt-5">
        <table className="w-11/12 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">İsim</th>
              <th scope="col" className="px-6 py-3">Araç</th>
              <th scope="col" className="px-6 py-3">Özellik</th>
              <th scope="col" className="px-6 py-3">Özellik 2</th>
              <th scope="col" className="px-6 py-3">oem Numarası</th>
              <th scope="col" className="px-6 py-3">Orjinal Numarası</th>
              <th scope="col" className="px-6 py-3">Raf Numarası</th>
              <th scope="col" className="px-6 py-3">Eklenme Tarihi</th>
              <th scope="col" className="px-6 py-3">Güncellenme Tarihi</th>
              <th scope="col" className="px-6 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {data?.getAllProducts.map((d: any) => {
              return (<tr key={d._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                  {d.name}
                </td>
                <td className="px-6 py-4">
                  {d.arac}
                </td>
                <td className="px-6 py-4">
                  {d.ozellik}
                </td>
                <td className="px-6 py-4">
                  {d.ozellik2}
                </td>
                <td className="px-6 py-4">
                  {d.oem_no}
                </td>
                <td className="px-6 py-4">
                  {d.orjinal_no}
                </td>
                <td className="px-6 py-4">
                  {d.shelf_id}
                </td>
                <td className="px-6 py-4">
                  {new Date(d.created_at).toLocaleString("tr-TR")}
                </td>
                <td className="px-6 py-4">
                  {new Date(d.updated_at).toLocaleString("tr-TR")}
                </td>
                <td className="px-6">
                  <button className="text-green-500 hover:text-green-700" onClick={() => {
                    props.updateState(d._id)
                  }} >Düzenle</button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => {
                    deleteProduct({
                      variables: {
                        input: { _id: d._id }
                      }, refetchQueries: [GET_ALL_PRODUCTS]
                    })
                  }}>Sil</button>
                </td>
              </tr>);
            })}
          </tbody>
        </table>
      </div>
        </>
    )
}