import React from "react";
import dayjs from "dayjs";
export default function Table(props: any) {
  function getNames() {
    if (props.data.length > 0) {
      const clearNames = Object.getOwnPropertyNames(props.data[0]).filter((n:any)=>{
        if(n != "_id" && n != "__typename"){
          return n
        }
      })
      clearNames.push("İşlem")
      return clearNames
    } else {
      return []
    }
  }
  return (
    
    <>
    <div className="relative overflow-x-auto mt-5">
      <table className="w-11/12 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {getNames().map((n: any, i: any) => {
              return <th key={i} scope="col" className="px-6 py-3">{n}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data?.map((d: any) => {
            return (<tr key={d._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                {d.bina_no}
              </td>
              <td className="px-6 py-4">
                <span className="text-green-500 hover:text-green-700">{d.active ? "Aktif" : "Pasif"}</span>
              </td>
              <td className="px-6 py-4">
                {d.created_at}
                {dayjs(d.created_at).format("LLL")}
              </td>
              <td className="px-6 py-4">
                {d.updated_at}
              </td>
              <td className="px-6">
                <button className="text-green-500 hover:text-green-700" onClick={()=>{
                  props.updateState(d._id)
                }} >Düzenle</button>
                <button className="text-red-500 hover:text-red-700" onClick={() => {
                  props.deleteFunc(d._id)
                }}>Sil</button>
              </td>

            </tr>);
          })}

        </tbody>
      </table>
    </div></>
  );
}