import { DELETE_STRUCTURE, STRUCTURE_LIST } from "@/modules/resolvers/structureResolvers";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import dayjs from "dayjs";


export default function StructureTable(props: any) {
    const { data, loading, error } = useQuery(STRUCTURE_LIST)
    const [deleteStructure, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_STRUCTURE)

    if(loading) return <div>Loading</div>
    if(error) return <div>Error</div>
    return (
        <>
            <div className="relative overflow-x-auto mt-5">
      <table className="w-11/12 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Bina Numarası</th>
            <th scope="col" className="px-6 py-3">Aktiflik</th>
            <th scope="col" className="px-6 py-3">Ekleme Tarihi</th>
            <th scope="col" className="px-6 py-3">Son Güncecllenme Tarihi</th>
            <th scope="col" className="px-6 py-3">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {data?.getAllStructures.map((d: any) => {
            return (<tr key={d._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                {d.bina_no}
              </td>
              <td className="px-6 py-4">
                <span className="text-green-500 hover:text-green-700">{d.active ? "Aktif" : "Pasif"}</span>
              </td>
              <td className="px-6 py-4">
                { new Date(d.created_at).toLocaleString("tr-TR")}
              </td>
              <td className="px-6 py-4">
              { new Date(d.updated_at).toLocaleString("tr-TR")}
              </td>
              <td className="px-6">
                <button className="text-green-500 hover:text-green-700" onClick={()=>{
                  props.updateState(d._id)
                }} >Düzenle</button>
                <button className="text-red-500 hover:text-red-700" onClick={() => {
                  deleteStructure({
                    variables: {
                        input: { _id: d._id }
                    }, refetchQueries: [STRUCTURE_LIST]
                })
                }}>Sil</button>
              </td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
        </>
    );
}