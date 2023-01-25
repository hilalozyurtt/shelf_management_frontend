import Head from 'next/head'
import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import AuthContext from '@/context/authContext';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/modules/resolvers/userResolvers';

export default function Login() {
  const router = useRouter();
  const context = useContext(AuthContext)
  const [values, setInputs] = useState({ username: "", password: "" })

  const onFinish = (inputs: any) => {
    loginUser()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (e: any) => {
    setInputs({ ...values, [e.target.name]: e.target.value })
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData)
      router.push("/user")
    },
    variables: {
      input: {
        username: values.username,
        password: values.password
      }
    }
  })
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Kullanıcı Adı"
          name="username"
          rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz!' }]}>
          <Input name="username" onChange={onValuesChange} />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}>
          <Input name="password" onChange={onValuesChange} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="default" htmlType="submit" >Giriş</Button>
        </Form.Item>
      </Form>

    </>
  )
}
