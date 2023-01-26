import React, { useContext, useState } from 'react';
import AuthContext from "@/context/authContext";
import { Button, Form, Input, Space } from 'antd';
import Link from 'next/link';

const App = () => {

  const [form] = Form.useForm();
  const { user }: any = useContext(AuthContext)

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
  };


  return (
    <Form {...layout} form={form} name="control-hooks" initialValues={user}>
      <Form.Item name="_id" label="İsim" className='hidden' >
        <Input name="_id" disabled/>
      </Form.Item>
      <Form.Item name="username" label="İsim">
        <Input name="username" disabled />
      </Form.Item>
      <Form.Item name="usersurname" label="Soyad" >
        <Input name="usersurname" disabled/>
      </Form.Item>
      <Form.Item name="phone" label="Tel.No" >
        <Input name="phone" disabled/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button><Link href={{ pathname: "user/update_user", query: { id: user?._id } }}>Bilgileri Güncelle</Link></Button>
        <Button><Link href={{ pathname: "user/update_password", query: { id: user?._id } }}>Şifre Değiştir</Link></Button>
        {user?.role == "admin" ? <Link className='' href={{ pathname: "users/create_user" }}><Button>Yeni Kullanıcı Oluştur</Button></Link> : ""}
        <br />
        <br />
        {user?.role == "admin" ? <Link className='' href={{ pathname: "users" }}>Kullanıcılar Listesini Gör</Link> : ""}
      </Form.Item>
    </Form>
  );

};

export default App;
