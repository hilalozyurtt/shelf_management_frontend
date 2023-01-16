import { GET_PRODUCT, UPDATE_PRODUCT } from "@/modules/resolvers/productResolvers";
import { GET_ALL_SHELFS } from "@/modules/resolvers/shelfResolvers";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

type product = {
    _id: string,
    arac: string,
    name: string,
    oem_no: string,
    orjinal_no: string,
    ozellik: string,
    ozellik2: string,
    shelf_id: string
}
export default function UpdateProductForm(props: any) {
    const [inputs, setInputs] = useState<product>({ _id: "", arac: "", name: "", oem_no: "", orjinal_no: "", ozellik: "", ozellik2: "", shelf_id: "" })
    const { data: pData, loading: pLoading, error: pError } = useQuery(GET_PRODUCT, { variables: { input: { _id: props.productId.id } } })
    const { data: stData, loading: stLoading, error: stError } = useQuery(GET_ALL_SHELFS)
    const [updateProduct, { data, loading, error }] = useMutation(UPDATE_PRODUCT)

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (e: any) => {
        console.log("burayageliyomu");
        
        e.preventDefault()
        updateProduct({
            variables: {
                input: {
                    _id: inputs._id,
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
    }

    useEffect(() => {
        setInputs(pData?.getProduct)
    }, [pData])

    const className = "bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
    if (loading || pLoading || stLoading) return <div>Loading</div>
    if (error || pError || stError) return <div>Error</div>
    return (
        <div className="p-8 rounded border border-gray-200">
            <h4 className="font-medium text-xl">Ürün Güncelleme Ekranı</h4>
            <p className="text-gray-600 mt-6">Bu alan sadece Adminlere açıktır!.</p>
            <form onSubmit={handleSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div>
                        <input type="text" name="_id" id="_id" className="hidden" value={inputs?._id} onChange={handleChange} />

                        <label htmlFor="name" className="text-sm text-gray-700 block mb-1 font-medium">İsim</label>
                        <input type="text" name="name" id="name" className={className} value={inputs?.name} onChange={handleChange} />

                        <label htmlFor="arac" className="text-sm text-gray-700 block mb-1 font-medium">Araç</label>
                        <input type="text" name="arac" id="arac" className={className} value={inputs?.arac} onChange={handleChange} />

                        <label htmlFor="oem_no" className="text-sm text-gray-700 block mb-1 font-medium">oem numarası</label>
                        <input type="text" name="oem_no" id="oem_no" className={className} value={inputs?.oem_no} onChange={handleChange} />

                        <label htmlFor="orjinal_no" className="text-sm text-gray-700 block mb-1 font-medium">Orjinal Numarası</label>
                        <input type="text" name="orjinal_no" id="orjinal_no" className={className} value={inputs?.orjinal_no} onChange={handleChange} />

                        <label htmlFor="ozellik" className="text-sm text-gray-700 block mb-1 font-medium">Özellik</label>
                        <input type="text" name="ozellik" id="ozellik" className={className} value={inputs?.ozellik} onChange={handleChange} />

                        <label htmlFor="ozellik2" className="text-sm text-gray-700 block mb-1 font-medium">Özellik 2</label>
                        <input type="text" name="ozellik2" id="ozellik2" className={className} value={inputs?.ozellik2} onChange={handleChange} />

                        <label htmlFor="shelf_id" className="text-sm text-gray-700 block mb-1 font-medium">Raf Numarası</label>
                        <select name="shelf_id" className={className} onChange={handleChange} value={inputs?.shelf_id}>
                            <option></option>
                            {stData?.getAllShelfs.map((s: any) => {
                                return <option key={s._id} value={s._id}>{s.raf_no}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className="space-x-4 mt-8">
                <button type="submit" >
                <Button type="primary" loading={data?.updateProduct}>
                    Click me!
                </Button></button>
                    <button onClick={() => { props.setShowComp({ table: true, createForm: false, updateForm: false }) }} className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
                </div>
            </form>
        </div>
    );
}