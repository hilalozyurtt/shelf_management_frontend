import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useRouter } from "next/router";
import Link from 'next/link';
import { GET_USER, LOGOUT, UPDATE_ST_USER_PASSWORD } from '@/modules/resolvers/userResolvers';
import AuthContext from '@/context/authContext';

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
    password: string,
    newpassword: string,
    confirmPassword: string
}

const App: React.FC = (props: any) => {
  const context = useContext(AuthContext)
  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<user>({ _id: "", password: "", newpassword: "", confirmPassword: ""})
  const { data: pData, loading: pLoading, error: pError } = useQuery(GET_USER, { variables: { input: { _id: props.userId } } })
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_ST_USER_PASSWORD)
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

  const router = useRouter()
  const handleSubmit = async (e: any) => {
    await updateUser({
        variables: {
            input: {
                _id: props.userId,
                password: inputs.password,
                newpassword: inputs.newpassword,
                confirmPassword: inputs.confirmPassword

            }
        }
    })  
    await logout()
    router.reload()
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
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit}>
      <Form.Item name="_id" label="_id" className='hidden' rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="_id" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="password" label="Önceki Şifre" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="password" type='password' onChange={handleChange} />
      </Form.Item>
      <Form.Item name="newpassword" label="Yeni Şifre" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="newpassword" type='password' onChange={handleChange} />
      </Form.Item>
      <Form.Item name="confirmPassword" label="Yeni Şifreyi Tekrar Girin" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true }]}>
        <Input name="confirmPassword" type='password' onChange={handleChange} />
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