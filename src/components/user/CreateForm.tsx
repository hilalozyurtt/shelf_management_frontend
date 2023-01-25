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
  const [messageApi, contextHolder] = message.useMessage()


  if (dataCreate) {
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
      {contextHolder}
      <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit}>
        <Form.Item name="username" label="Araç" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Input name="username" onChange={handleChange} />
        </Form.Item>
        <Form.Item name="usersurname" label="Özellik" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Input name="usersurname" onChange={handleChange} />
        </Form.Item>
        <Form.Item name="phone" label="Özellik 2" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Input name="phone" onChange={handleChange} />
        </Form.Item>
        <Form.Item name="structure_id" label="Bina Numarası" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Select placeholder="Bina numarası seçiniz." onChange={handleChange} allowClear >
            {stData?.getAllStructures.map((s: any) => {
              return <option key={s._id} value={s._id}>{s.bina_no} </option>
            })}
          </Select>
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