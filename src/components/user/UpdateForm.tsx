import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Router from "next/router";
import Link from 'next/link';
import { GET_USER, LOGOUT, UPDATE_ST_USER } from '@/modules/resolvers/userResolvers';

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

type user = {
    _id: string,
    username: string,
    usersurname: string,
    phone: string
}

const App: React.FC = (props: any) => {
  console.log(props.productId);
  
  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<user>({ _id: "", username: "", usersurname: "", phone: ""})
  const { data: pData, loading: pLoading, error: pError } = useQuery(GET_USER, { variables: { input: { _id: props.userId } } })
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_ST_USER)
  const [messageApi, contextHolder] = message.useMessage()
  const [logout,{data: lData, loading: lLoading, error: lError}] = useLazyQuery(LOGOUT, {fetchPolicy: "no-cache" })

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

  const handleSubmit = async (e: any) => {
    await updateUser({
        variables: {
            input: {
                _id: inputs._id,
                username: inputs.username,
                usersurname: inputs.usersurname,
                phone: inputs.phone

            }
        }
    })
    logout()
    Router.reload()
  }

  useEffect(() => {
    setInputs(pData?.user)
  }, [pData])

  const onReset = () => {
    form.resetFields();
  };

  if( loading || pLoading) return <div>loading</div>
  if (error || pError) return <div>Error</div>

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit} initialValues={pData?.user}>
      <Form.Item name="_id" label="İsim" className='hidden' rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="_id" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="username" label="Araç" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="username" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="usersurname" label="Özellik" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="usersurname" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="phone" label="Özellik 2" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="phone" onChange={handleChange} />
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