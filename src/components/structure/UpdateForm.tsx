import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import Router from "next/router";
import Link from 'next/link';
import { GET_STRUCTURE, UPDATE_STRUCTURE } from '@/modules/resolvers/structureResolvers';

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

type structure = {
    _id: string
    bina_no: string
}

const App: React.FC = (props: any) => {
  const [inputs, setInputs] = useState<structure>({ _id: "", bina_no: "" })
  const { data: shData, loading: shLoading, error: shError } = useQuery(GET_STRUCTURE, { variables: { input: { _id: props.structureId } } })
  const [updateStructure, { data, loading, error }] = useMutation(UPDATE_STRUCTURE)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm();

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
    setInputs(values => ({ ...values, ["structure_id"]: value }))
  };

  const handleSubmit = (e: any) => {
    updateStructure({
        variables: {
            input: {
                _id: inputs._id,
                bina_no: inputs.bina_no
            }
        }
    })
    Router.push("/structure")
  }

  useEffect(() => {
    setInputs({ _id: shData?.getStructure._id, bina_no: shData?.getStructure.bina_no })
  }, [shData])

  const onReset = () => {
    form.resetFields();
  };

  if(loading || shLoading) return <div>loading</div>
  if (error || shError) return <div>Error</div>

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit} initialValues={shData?.getStructure}>
      <Form.Item name="bina_no" label="Bina Numarası" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="bina_no" onChange={handleChange} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="default" htmlType="submit">
          Güncelle
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