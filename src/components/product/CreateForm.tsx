import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client"
import { CREATE_PRODUCT } from "@/modules/resolvers/productResolvers";
import { GET_ALL_SHELFS } from "@/modules/resolvers/shelfResolvers";
import Router from "next/router";

type product = {
    arac: string,
    name: string,
    oem_no: string,
    orjinal_no: string,
    ozellik: string,
    ozellik2: string,
    shelf_id: string
}

export default function CreateProductForm(props: any) {
    const [inputs, setInputs] = useState<product>({arac:"",name:"",oem_no:"",orjinal_no:"",ozellik:"",ozellik2:"",shelf_id:""})
    const { data: stData, loading: stLoading, error: stError } = useQuery(GET_ALL_SHELFS)
    const [createStructure, { data, loading, error }] = useMutation(CREATE_PRODUCT)

    const handleChange = (event:any) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await createStructure({
            variables: {
                input: {
                    arac: inputs.arac,
                    name: inputs.name,
                    oem_no: inputs.oem_no,
                    orjinal_no: inputs.orjinal_no,
                    ozellik: inputs.ozellik,
                    ozellik2: inputs.ozellik2,
                    shelf_id: inputs.shelf_id
                }
            }
        })
        Router.push("/product")
    }

    const className = "bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
    if(stLoading) return <div>Loading</div>
    if(stError) return <div>error</div>
    return (
        <div className="p-8 rounded border border-gray-200">
            <h4 className="font-medium text-xl">Ürün Oluşturma</h4>
            <p className="text-gray-600 mt-6">Bu alan sadece Adminlere açıktır!.</p>
            <form onSubmit={handleSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="text-sm text-gray-700 block mb-1 font-medium">İsim</label>
                        <input type="text" name="name" id="name" className={className} onChange={handleChange} />

                        <label htmlFor="arac" className="text-sm text-gray-700 block mb-1 font-medium">Araç</label>
                        <input type="text" name="arac" id="arac" className={className} onChange={handleChange} />

                        <label htmlFor="oem_no" className="text-sm text-gray-700 block mb-1 font-medium">oem numarası</label>
                        <input type="text" name="oem_no" id="oem_no" className={className} onChange={handleChange} />

                        <label htmlFor="orjinal_no" className="text-sm text-gray-700 block mb-1 font-medium">Orjinal Numarası</label>
                        <input type="text" name="orjinal_no" id="orjinal_no" className={className} onChange={handleChange} />

                        <label htmlFor="ozellik" className="text-sm text-gray-700 block mb-1 font-medium">Özellik</label>
                        <input type="text" name="ozellik" id="ozellik" className={className} onChange={handleChange} />

                        <label htmlFor="ozellik2" className="text-sm text-gray-700 block mb-1 font-medium">Özellik 2</label>
                        <input type="text" name="ozellik2" id="ozellik2" className={className} onChange={handleChange} />

                        <label htmlFor="shelf_id" className="text-sm text-gray-700 block mb-1 font-medium">Raf Numarası</label>
                        <select name="shelf_id" className={className} onChange={handleChange}>
                            <option></option>
                            {stData?.getAllShelfs.map((s:any)=>{
                                return <option key={s._id} value={s._id}>{s.raf_no}</option>
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