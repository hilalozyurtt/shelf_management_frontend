import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client"
import { CREATE_STRUCTURE } from "@/modules/resolvers/structureResolvers";
import { Button, message, Space } from 'antd';
import Router from "next/router";


type structure = {
    bina_no: string
}

export default function CreateStructureForm(props: any) {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
    messageApi.open({
        type: 'success',
        content: 'This is a success message',
    });
    };
    const [inputs, setInputs] = useState<structure>({ bina_no: "" })
    const [createStructure, { data, loading, error }] = useMutation(CREATE_STRUCTURE)

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
                    bina_no: inputs.bina_no
                }
            }
        })
        Router.push("/structure")
    }

    const className = "bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
    return (
        <div className="p-8 rounded border border-gray-200">
            {contextHolder}
            <h4 className="font-medium text-xl">Bina Güncelleme Ekranı</h4>
            <p className="text-gray-600 mt-6">Bu alan sadece Adminlere açıktır!.</p>
            <form onSubmit={handleSubmit}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="bina_no" className="text-sm text-gray-700 block mb-1 font-medium">Name</label>
                        <input type="text" name="bina_no" id="bina_no" className={className} onChange={handleChange} />
                    </div>
                </div>
                <div className="space-x-4 mt-8">
                    <Button onClick={success} htmlType="submit">Success</Button>
                </div>
            </form>
        </div>
    );
}