import React, { useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { REGISTER_USER } from '@/modules/resolvers/userResolvers';

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

type user = {
  username: string,
  usersurname: string,
  phone: string,
  role: string,
  password: string
}

const App: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<user>({ username: "", usersurname: "", phone: "", role: "", password: "" })
  const [createUser, { data: dataCreate, loading: dataLoading, error: dataError }] = useMutation(REGISTER_USER)


  const handleChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const onChange = (value: string) => {
    setInputs(values => ({ ...values, ["role"]: value }))
  };

  const handleSubmit = async (e: any) => {
    await createUser({
      variables: {
        input: {
          username: inputs.username,
          usersurname: inputs.usersurname,
          phone: inputs.phone,
          role: inputs.role,
          password: inputs.password
        }
      }
    })
  }

  const onReset = () => {
    form.resetFields();
  };

  if (dataLoading) return <div>loading</div>
  if (dataError) return <div>Error</div>
  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit}>
        <Form.Item name="username" label="İsim" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Input name="username" onChange={handleChange} />
        </Form.Item>
        <Form.Item name="usersurname" label="Soy İsim" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Input name="usersurname" onChange={handleChange} />
        </Form.Item>
        <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Input name="phone" onChange={handleChange} />
        </Form.Item>
        <Form.Item name="role" label="Bina Numarası" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Select placeholder="Raf numarası seçiniz." onChange={onChange} allowClear >
            <option key={"1"} value={"admin"}>Admin</option>
            <option key={"2"} value={"user"}>Panel Kullanıcısı</option>
          </Select>
        </Form.Item>
        <Form.Item name="password" label="Şifre" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Input name="password" type='password' onChange={handleChange} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="default" htmlType="submit">
            Güncelle
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Sıfırla
          </Button>
          {/* Alttaki className'i almak için tarayıcıda inspect diyerek üsttkei kaydet ve sıfırla butonlarının üstüne geldim ve orda gözüken classlar (ç)aldım. bu sayede görüntü aynı oldu */}
          <Link className='ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default' href={'/settings'}>
            Vazgeç
          </Link>

        </Form.Item>
      </Form>
    </>
  );
};

export default App;