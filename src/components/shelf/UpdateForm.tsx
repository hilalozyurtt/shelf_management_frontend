import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Result, Select, Spin } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SHELF, UPDATE_SHELF } from '@/modules/resolvers/shelfResolvers';
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

type shelf = {
    _id: string,
    raf_no: string,
}

const App: React.FC = (props: any) => {
  
  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<shelf>({ _id: "", raf_no: "" })
  const { data: shData, loading: shLoading, error: shError } = useQuery(GET_SHELF, { variables: { input: { _id: props.shelfId } } })
  const [updateShelf, { data, loading, error }] = useMutation(UPDATE_SHELF)
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

  const handleSubmit = async (e: any) => {
    await updateShelf({
        variables: {
            input: {
                _id: inputs._id,
                raf_no: inputs.raf_no,
            }
        }
    })
    Router.push("/shelf")
  }

  useEffect(() => {
    setInputs(shData?.getShelf)
  }, [shData])

  const onReset = () => {
    form.resetFields();
  };

  if(loading || shLoading) return (
    <Result
      icon={<Spin size="large" />}
    />
  )

  if(loading || shLoading) return (
    <Result
      status="500"
      title="500"
      subTitle="Üzgünüz, bir hata oluştu."
  />
  )



  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit} initialValues={shData?.getShelf} layout= "vertical">
      <Form.Item name="raf_no" label="Raf Numarası" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="raf_no" onChange={handleChange} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="default" htmlType="submit">
          Güncelle
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Sıfırla
        </Button>
        {/* Alttaki className'i almak için tarayıcıda inspect diyerek üsttkei kaydet ve sıfırla butonlarının üstüne geldim ve orda gözüken classlar (ç)aldım. bu sayede görüntü aynı oldu */}
        <Link className='ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default' href={'/shelf'}>
          Vazgeç
        </Link>
        
      </Form.Item>
    </Form>
  );
};

export default App;