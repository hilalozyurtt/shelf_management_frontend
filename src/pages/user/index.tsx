import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import AuthContext from '@/context/authContext';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/modules/resolvers/userResolvers';


const App: React.FC = () => {
   const router = useRouter();
   const context = useContext(AuthContext)
   const [values, setInputs] = useState({email:"",password:""})

  const onFinish = (inputs: any) => {
    console.log('Success:', inputs);
    loginUser()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (e :any) => {
	console.log("geldiii");
	console.log(e.target);

	setInputs({ ...values, [e.target.name]: e.target.value })
	console.log(values);
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
	update(proxy, { data: { loginUser: userData } }) {
		context.login(userData)
		router.push("/")
	},
	variables: {
		input:{
		email:values.email,
		password:values.password
		}
	}
	})

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="E-mail"
        name="email"
        onMetaChange={onValuesChange}
        rules={[{ required: true, message: 'Lütfen mail adresinizi giriniz!' }]}>
        <Input name="email" onChange={onValuesChange} />
      </Form.Item>

      <Form.Item
        label="Şifre"
        name="password"
        rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}>
        <Input name="password" onChange={onValuesChange} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" >Giriş</Button>
      </Form.Item>
    </Form>
  );
};

export default App;