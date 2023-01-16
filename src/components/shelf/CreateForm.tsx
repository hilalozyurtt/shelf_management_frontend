import React, {useState } from "react";
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_SHELF } from "@/modules/resolvers/shelfResolvers";
import { STRUCTURE_LIST } from "@/modules/resolvers/structureResolvers";


type shelf = {
    raf_no: string
    structure_id: string
}

export default function CreateShelfForm(props: any) {
    const [inputs, setInputs] = useState<shelf>({ raf_no: "", structure_id: "" })
    const [createShelf, { data, loading, error }] = useMutation(CREATE_SHELF)
    const { data:stData, loading:stLoading, error:stError } = useQuery(STRUCTURE_LIST)


    const handleChange = (event:any) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
        console.log("***********");
        console.log(inputs)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await createShelf({
            variables: {
                input: {
                    raf_no: inputs.raf_no,
                    structure_id: inputs.structure_id
                }
            }
        })
        props.setShowComp({ table: true, createForm: false, updateForm: false })
    }

    const className = "bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
    return (
        <div className="p-8 rounded border border-gray-200">
            <h4 className="font-medium text-xl">Raf Yeri Ekle</h4>
            <p className="text-gray-600 mt-6">Bu alan sadece Adminlere açıktır!.</p>
            <form onSubmit={handleSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="raf_no" className="text-sm text-gray-700 block mb-1 font-medium">Raf Numarası</label>
                        <input type="text" name="raf_no" id="raf_no" className={className} onChange={handleChange} />
                        <label htmlFor="structure_id" className="text-sm text-gray-700 block mb-1 font-medium">Bina</label>
                        <select name="structure_id" className={className} onChange={handleChange}>
                            <option></option>
                            {stData?.getAllStructures.map((s:any)=>{
                                return <option key={s._id} value={s._id}>{s.bina_no}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="space-x-4 mt-8">
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Kaydet</button>
                </div>
            </form>
        </div>
    );
}