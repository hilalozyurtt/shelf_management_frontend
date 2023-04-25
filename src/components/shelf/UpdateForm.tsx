import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Result, Select, Spin } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SHELF, UPDATE_SHELF } from '@/modules/resolvers/shelfResolvers';
import Router from "next/router";
import Link from 'next/link';
import { GET_ALL_STRUCTURES } from '@/modules/resolvers/structureResolvers';

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

type shelf = {
    _id: string,
    raf_no: string,
    structure_id: string,
}

const App: React.FC = (props: any) => {
  
  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<shelf>({ _id: "", raf_no: "", structure_id: ""})
  const { data: shData, loading: shLoading, error: shError } = useQuery(GET_SHELF, { variables: { input: { _id: props.shelfId } } })
  const { data: stData, loading: stLoading, error: stError } = useQuery(GET_ALL_STRUCTURES)
  const [updateShelf, { data, loading, error }] = useMutation(UPDATE_SHELF)
  const [messageApi, contextHolder] = message.useMessage()

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
    setInputs(values => ({ ...values, ["structure_id"]: value }))
  };

  const handleSubmit = async (e: any) => {
    await updateShelf({
        variables: {
            input: {
                _id: inputs._id,
                raf_no: inputs.raf_no,
                structure_id: inputs.structure_id
            }
        }
    })
    Router.push("/shelf")
  }

  useEffect(() => {
    setInputs(shData?.getShelf)
  }, [shData])

  const onReset = () => {
    form.resetFields();
  };

  if(stLoading || loading || shLoading) return (
    <Result
      icon={<Spin size="large" />}
    />
  )

  if(stLoading || loading || shLoading) return (
    <Result
      status="500"
      title="500"
      subTitle="Üzgünüz, bir hata oluştu."
  />
  )



  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit} initialValues={shData?.getShelf} layout= "vertical">
      <Form.Item name="raf_no" label="Raf Numarası" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="raf_no" onChange={handleChange} />
      </Form.Item>
      <Form.Item name="structure_id" label="Bina Numarası"  rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Select placeholder="Bina numarası seçiniz." onChange={onChange}  allowClear>
        {stData?.getAllStructures.map((s:any)=>{
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
        <Link className='ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default' href={'/shelf'}>
          Vazgeç
        </Link>
        
      </Form.Item>
    </Form>
  );
};

export default App;