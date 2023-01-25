import React, { useEffect, useState } from 'react';
import { Button, Form, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import Router from "next/router";
import Link from 'next/link';
import { GET_SYSTEM_PARAMS, UPDATE_SYSTEM_PARAMS } from '@/modules/resolvers/systemParamsResolvers';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

type system = {
  value: string
}

const App: React.FC = (props: any) => {

  const [inputs, setInputs] = useState<system>({ value: "false" })
  const [form] = Form.useForm();
  const { data, loading, error } = useQuery(GET_SYSTEM_PARAMS, { variables: { input: { _id: props._id } } })
  const [updateSystemParams, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_SYSTEM_PARAMS)


  const onChange = (value: string) => {
    if(value == "true"){
      setInputs({value: "true"})
    }else{
      setInputs({value: "false"})
    }
  };

  const handleSubmit = (e: any) => {
    updateSystemParams({
      variables: {
        input: {
          _id: props._id,
          value: inputs?.value == "true" ? true : false
        }
      }
    })
    Router.push("/settings")
  }
  useEffect(() => {
    setInputs({ value: data?.getSystemParams.value })
  }, [data])

  if (loading) return <div>loading</div>
  if (error) return <div>Error</div>

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit}>
      <Form.Item name="value" label={data?.getSystemParams.key} rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
        <Select
          defaultValue={data?.getSystemParams.value.toString()}
          allowClear
          onChange={onChange}
          options={[
            { value: "true", label: 'Evet' },
            { value: "false", label: 'Hayır' },
            
          ]}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="default" htmlType="submit">
          Güncelle
        </Button>
        {/* Alttaki className'i almak için tarayıcıda inspect diyerek üsttkei kaydet ve sıfırla butonlarının üstüne geldim ve orda gözüken classlar (ç)aldım. bu sayede görüntü aynı oldu */}
        <Link className='ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default' href={'/settings'}>
          Vazgeç
        </Link>

      </Form.Item>
    </Form>
  );
};

export default App;