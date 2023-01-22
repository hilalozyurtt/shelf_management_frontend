import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SHELFS } from '@/modules/resolvers/shelfResolvers';
import { CREATE_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT } from '@/modules/resolvers/productResolvers';
import Router from "next/router";
import Link from 'next/link';

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

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

const App: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<product>({ _id: "", arac: "", name: "", oem_no: "", orjinal_no: "", ozellik: "", ozellik2: "", shelf_id: "" })
  const { data: pData, loading: pLoading, error: pError } = useQuery(GET_PRODUCT, { variables: { input: { _id: props.productId } } })
  const { data: stData, loading: stLoading, error: stError } = useQuery(GET_ALL_SHELFS)
  const [updateProduct, { data, loading, error }] = useMutation(UPDATE_PRODUCT)
  const [messageApi, contextHolder] = message.useMessage()

  if(data){
    messageApi.open({
        type: 'success',
        content: 'Güncelleme başarılı',
      });
  }

  const handleChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setInputs(values => ({ ...values, ["shelf_id"]: value }))
  };

  const handleSubmit = (e: any) => {
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
    Router.push("/product")
  }

  useEffect(() => {
    if (pData) {
        console.log("222222222222222");
        console.log(pData?.getProduct);
        
    }
    setInputs(pData?.getProduct)
    console.log("************");
    console.log(inputs);
    
    
  }, [pData])

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  if(stLoading || loading || pLoading) return <div>loading</div>
  if (error || stError || pError) return <div>Error</div>

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit}>
      <Form.Item name="name" label="İsim" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="name" onChange={handleChange} value={inputs?.name} />
      </Form.Item>
      <Form.Item name="arac" label="Araç" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="arac" onChange={handleChange} value={inputs?.arac}/>
      </Form.Item>
      <Form.Item name="ozellik" label="Özellik" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="ozellik" onChange={handleChange} value={inputs?.ozellik}/>
      </Form.Item>
      <Form.Item name="ozellik2" label="Özellik 2" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="ozellik2" onChange={handleChange} value={inputs?.ozellik2}/>
      </Form.Item>
      <Form.Item name="oem_no" label="OEM No" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="oem_no" onChange={handleChange} value={inputs?.oem_no}/>
      </Form.Item>
      <Form.Item name="orjinal_no" label="Orj No" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="orjinal_no" onChange={handleChange} value={inputs?.orjinal_no}/>
      </Form.Item>
      <Form.Item name="shelf_id" label="Raf No"  rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Select placeholder="Raf numarası seçiniz." onChange={onChange}  allowClear value={inputs?.shelf_id}>
        {stData?.getAllShelfs.map((s:any)=>{
            return <option key={s._id} value={s._id}>{s.raf_no} </option>
        })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="default" htmlType="submit">
          Güncelle
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Sıfırla
        </Button>
        {/* Alttaki className'i almak için tarayıcıda inspect diyerek üsttkei kaydet ve sıfırla butonlarının üstüne geldim ve orda gözüken classlar (ç)aldım. bu sayede görüntü aynı oldu */}
        <Link className='ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default' href={'/product'}>
          Vazgeç
        </Link>
        
      </Form.Item>
    </Form>
  );
};

export default App;