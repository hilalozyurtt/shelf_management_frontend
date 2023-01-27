import { useMutation } from '@apollo/client';
import { Button, Form, Input, message, Select } from 'antd';
import { UPDATE_USER_PASSWORD_ADMIN } from '../../modules/resolvers/userResolvers';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

type user = {
  new_password: string
}

export default function UpdateUserPass(props: any){
  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<user>({ new_password: "" })
  const [updateUserPassword, {data, loading, error}] = useMutation(UPDATE_USER_PASSWORD_ADMIN)
  const router = useRouter()

  const handleChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    await updateUserPassword({
      variables: {
        input: {
          user_id: props.userId,
          new_password: inputs.new_password
        }
      }
    })
    router.push('/users')
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit}>
        <Form.Item name="new_password" label="Yeni Şifre" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace: true }]}>
          <Input name="new_password" type='password' onChange={handleChange} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="default" htmlType="submit">
            Kaydet
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Sıfırla
          </Button>
          {/* Alttaki className'i almak için tarayıcıda inspect diyerek üsttkei kaydet ve sıfırla butonlarının üstüne geldim ve orda gözüken classlar (ç)aldım. bu sayede görüntü aynı oldu */}
          <Link className='ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default' href={'/users'}>
            Vazgeç
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}