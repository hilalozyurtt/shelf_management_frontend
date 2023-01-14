import React from "react";

export default function Table(props: any) {
  function getNames() {
    const names = Object.getOwnPropertyNames(props.data[0])
    return names
  }
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {getNames().map((n: any, i: any) => {
                    return <th key={i} scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">{n}</th>
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {props.data.map((d: any) => {
                  return (<tr key={d._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {d._id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {d.bina_no}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      <span className="text-green-500 hover:text-green-700">{d.active ? "Aktif" : "Pasif"}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {d.created_at}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {d.updated_at}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a className="text-green-500 hover:text-green-700" href="#">Edit</a>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a className="text-red-500 hover:text-red-700" href="#">Delete</a>
                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}