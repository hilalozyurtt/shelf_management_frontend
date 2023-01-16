import { GET_SHELF, UPDATE_SHELF } from "@/modules/resolvers/shelfResolvers";
import { STRUCTURE_LIST } from "@/modules/resolvers/structureResolvers";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

type shelf = {
    _id: string,
    raf_no: string,
    structure_id: string,
}

export default function UpdateShelfForm(props: any) {

    const [inputs, setInputs] = useState<shelf>({_id: "", raf_no: "", structure_id: "" })
    const { data: shData, loading: shLoading, error: shError } = useQuery(GET_SHELF, { variables: { input: { _id: props.shelfId.id } } })
    const { data: stData, loading: stLoading, error: stError } = useQuery(STRUCTURE_LIST)
    const [updateShelf, { data, loading, error }] = useMutation(UPDATE_SHELF)

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await updateShelf({
            variables: {
                input: {
                    _id: inputs._id,
                    raf_no: inputs.raf_no,
                    structure_id: inputs.structure_id
                }
            }
        })
    }

    // bina her değiştiğinde değişen değeri al 
    useEffect(() => {
        console.log("-------------------");
        console.log(shData);
        
        setInputs(shData?.getShelf)
    }, [shData])

    const className = "bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
    if (loading || shLoading || stLoading) return <div>Loading</div>
    if (error || shError || stError) return <div>Error</div>
    return (
        <div className="p-8 rounded border border-gray-200">
            <h4 className="font-medium text-xl">Raf Yeri Güncelleme Ekranı</h4>
            <p className="text-gray-600 mt-6">Bu alan sadece Adminlere açıktır!.</p>
            <form onSubmit={handleSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div>
                        <input type="text" name="_id" id="_id" className="hidden" value={inputs?._id} onChange={handleChange} />

                        <label htmlFor="raf_no" className="text-sm text-gray-700 block mb-1 font-medium">Raf Numarası</label>
                        <input type="text" name="raf_no" id="raf_no" className={className} value={inputs?.raf_no} onChange={handleChange} />

                        <label htmlFor="structure_id" className="text-sm text-gray-700 block mb-1 font-medium">Bina</label>
                        <select name="structure_id" className={className} onChange={handleChange} value={inputs?.structure_id}>
                            <option></option>
                            {stData?.getAllStructures.map((s: any) => {
                                return <option key={s._id} value={s._id}>{s.bina_no}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className="space-x-4 mt-8">
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Kaydet</button>
                    <button onClick={() => { props.setShowComp({ table: true, createForm: false, updateForm: false }) }} className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
                </div>
            </form>
        </div>
    );
}