import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SHELFS } from '@/modules/resolvers/shelfResolvers';
import { CREATE_PRODUCT } from '@/modules/resolvers/productResolvers';
import Router from "next/router";

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

type product = {
    arac: string,
    name: string,
    oem_no: string,
    orjinal_no: string,
    ozellik: string,
    ozellik2: string,
    shelf_id: string
}

const App: React.FC = () => {
  const [form] = Form.useForm();

  const [inputs, setInputs] = useState<product>({arac:"",name:"",oem_no:"",orjinal_no:"",ozellik:"",ozellik2:"",shelf_id:""})
  const { data: stData, loading: stLoading, error: stError } = useQuery(GET_ALL_SHELFS)
  const [createStructure, { data, loading, error }] = useMutation(CREATE_PRODUCT)

  const handleChange = (event:any) => {
    console.log("-------------------");
    const adana = event.target
    console.log(adana);
    
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
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

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };


  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit}>
      <Form.Item name="name" label="İsim" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!'}]}>
        <Input name="name" onChange={handleChange}/>
      </Form.Item>
      <Form.Item name="arac" label="Araç" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!' }]}>
        <Input name="arac" onChange={handleChange}/>
      </Form.Item>
      <Form.Item name="ozellik" label="Özellik" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!' }]}>
        <Input name="ozellik" onChange={handleChange}/>
      </Form.Item>
      <Form.Item name="ozellik2" label="Özellik 2" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!' }]}>
        <Input name="ozellik2" onChange={handleChange}/>
      </Form.Item>
      <Form.Item name="oem_no" label="OEM No" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!' }]}>
        <Input name="oem_no" onChange={handleChange}/>
      </Form.Item>
      <Form.Item name="orjinal_no" label="Orj No" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="orjinal_no" onChange={handleChange}/>
      </Form.Item>
      <Form.Item name="shelf_id" label="Raf No"  rules={[{ required: true, message: 'Lütfen alanı doldurunuz!' }]}>
        <Select placeholder="Raf numarası seçiniz." onChange={handleChange}  allowClear >
        {stData?.getAllShelfs.map((s:any)=>{
            return <option onChange={handleChange} key={s._id} value={s._id}>{s.raf_no} </option>
        })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="default" htmlType="submit">
          Kaydet
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Sıfırla
        </Button>
        <Button type="default" htmlType="button" href='/product'>
          Vazgeç
        </Button>
        
      </Form.Item>
    </Form>
  );
};

export default App;