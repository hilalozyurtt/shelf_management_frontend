import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Result, Select, Spin } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SHELFS } from '@/modules/resolvers/shelfResolvers';
import { GET_PRODUCT, UPDATE_PRODUCT } from '@/modules/resolvers/productResolvers';
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
    shelf_id: string,
    stock: number
}

const App: React.FC = (props: any) => {

  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<product>({ _id: "", arac: "", name: "", oem_no: "", orjinal_no: "", ozellik: "", ozellik2: "", shelf_id: "", stock:0 })
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
    setInputs(values => ({ ...values, ["shelf_id"]: value }))
  };

  const handleSubmit = async (e: any) => {
    await updateProduct({
        variables: {
            input: {
                _id: inputs._id,
                arac: inputs.arac,
                name: inputs.name,
                oem_no: inputs.oem_no,
                orjinal_no: inputs.orjinal_no,
                ozellik: inputs.ozellik,
                ozellik2: inputs.ozellik2,
                shelf_id: inputs.shelf_id,
                //@ts-ignore
                stock: parseInt(inputs.stock)
            }
        }
    })
    Router.push("/product")
  }

  useEffect(() => {
    setInputs(pData?.getProduct)
  }, [pData])

  const onReset = () => {
    form.resetFields();
  };

  if(pLoading || stLoading || loading) return (
    <Result
      icon={<Spin size="large" />}
    />
  )

  if(pError || stError || error) return (
    <Result
      status="500"
      title="500"
      subTitle="Üzgünüz, bir hata oluştu."
  />
  )

  return (
    <Form {...layout}  form={form} name="control-hooks" onFinish={handleSubmit} initialValues={pData?.getProduct} layout= "vertical">
      <Form.Item name="name" label="Ürün Adı" labelAlign="right" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="name" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="arac" label="Ürün Markası" labelAlign="right">
        <Input name="arac" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="ozellik" label="Özellik" labelAlign="right">
        <Input name="ozellik" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="ozellik2" label="Özellik 2">
        <Input name="ozellik2" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="oem_no" label="Ürün Kodu">
        <Input name="oem_no" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="orjinal_no" label="Ürün Boyutu" >
        <Input name="orjinal_no" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="stock" label="Stok" >
        <Input name="stock" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="shelf_id" label="Raf No"  rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Select placeholder="Raf numarası seçiniz." onChange={onChange}  allowClear>
        {stData?.getAllShelfs.map((s:any)=>{
            return <option key={s._id} value={s._id}>Raf No: <span className='text-red-700'>{s.raf_no}</span>  Bina No: <span className='text-green-700'>{s.bina_no}</span>  </option>
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