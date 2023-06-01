import React, { useState } from 'react';
import { Button, Form, Input, message, Result, Select, Spin } from 'antd';
import { useMutation } from '@apollo/client';
import Router from "next/router";
import Link from 'next/link';
import { CREATE_STRUCTURE } from '@/modules/resolvers/structureResolvers';

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 }, 
};

type structure = {
    bina_no: string
}

const App: React.FC = () => {
  const [form] = Form.useForm();

  const [inputs, setInputs] = useState<structure>({ bina_no: "" })
  const [createStructure, { data, loading, error }] = useMutation(CREATE_STRUCTURE)
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event:any) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    await createStructure({
        variables: {
            input: {
                bina_no: inputs.bina_no
            }
        }
    })
    Router.push("/structure")
  }

  const onReset = () => {
    form.resetFields();
  };

  if(loading) return (
    <Result
      icon={<Spin size="large" />}
    />
  )

  if(error ) return (
    <Result
      status="500"
      title="500"
      subTitle="Üzgünüz, bir hata oluştu."
  />
  )

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit} layout= "vertical">
      <Form.Item name="bina_no" label="Bina Numarası" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="bina_no" onChange={handleChange}/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="default" htmlType="submit">
          Kaydet
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Sıfırla
        </Button>
        {/* Alttaki className'i almak için tarayıcıda inspect diyerek üsttkei kaydet ve sıfırla butonlarının üstüne geldim ve orda gözüken classlar (ç)aldım. bu sayede görüntü aynı oldu */}
        <Link className='ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default' href={'/structure'}>
          Vazgeç
        </Link>
        
      </Form.Item>
    </Form>
  );
};

export default App;