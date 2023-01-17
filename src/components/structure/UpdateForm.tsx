import { GET_STRUCTURE, UPDATE_STRUCTURE } from "@/modules/resolvers/structureResolvers";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

type structure = {
    _id: string
    bina_no: string
}

export default function UpdateStructureForm(props: any) {
    const [inputs, setInputs] = useState<structure>({ _id: "", bina_no: "" })
    const { data: qData, loading: qLoading, error: qError } = useQuery(GET_STRUCTURE, { variables: { input: { _id: props.structureId } } })
    const [updateStructure, { data, loading, error }] = useMutation(UPDATE_STRUCTURE)

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        updateStructure({
            variables: {
                input: {
                    _id: inputs._id,
                    bina_no: inputs.bina_no
                }
            }
        })  
    }

    useEffect(() => {
        setInputs({ _id: qData?.getStructure._id, bina_no: qData?.getStructure.bina_no })
    }, [qData])
    
    const className = "bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
    if (loading || qLoading) return <div>Loading</div>
    if (error || qError) return <div>Error</div>
    return (
        <div className="p-8 rounded border border-gray-200">
            <h4 className="font-medium text-xl">Bina Güncelleme Ekranı</h4>
            <p className="text-gray-600 mt-6">Bu alan sadece Adminlere açıktır!.</p>
            <form onSubmit={handleSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="bina_no" className="text-sm text-gray-700 block mb-1 font-medium">Name</label>
                        <input type="text" name="bina_no" id="bina_no" className={className} value={inputs.bina_no} onChange={handleChange} />
                    </div>
                </div>

                <div className="space-x-4 mt-8">
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>
                    
                </div>
            </form>
        </div>
    );
}