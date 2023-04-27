import React, { useState } from 'react';
import { Button, Form, Input, Result, Select, Spin } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SHELF} from '@/modules/resolvers/shelfResolvers';
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
    structure_id: string
}

const App: React.FC = () => {
  const [form] = Form.useForm();

  const [inputs, setInputs] = useState<shelf>({_id:"", raf_no:"", structure_id:""})
  const [createShelf, { data, loading, error }] = useMutation(CREATE_SHELF)
  const { data:stData, loading:stLoading, error:stError } = useQuery(GET_ALL_STRUCTURES)

  const handleChange = (event:any) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const onChange = (value: string) => {
    setInputs(values => ({ ...values, ["structure_id"]: value }))
  };

  const handleSubmit = async (e: any) => {
    await createShelf({
        variables: {
            input: {
                raf_no: inputs.raf_no,
                structure_id: inputs.structure_id,
            }
        }
    })
    Router.push("/shelf")
  }

  const onReset = () => {
    form.resetFields();
  };
  
  if(stLoading || loading) return (
    <Result
      icon={<Spin size="large" />}
    />
  )

  if(stError || error) return (
    <Result
      status="500"
      title="500"
      subTitle="Üzgünüz, bir hata oluştu."
  />
  )

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleSubmit} layout= "vertical">
      <Form.Item name="raf_no" label="Raf Numarası" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Input name="raf_no" onChange={handleChange}/>
      </Form.Item>
      <Form.Item name="structure_id" label="Depo" rules={[{ required: true, message: 'Lütfen alanı doldurunuz!', whitespace:true}]}>
        <Select placeholder="Depo seçiniz" onChange={onChange}  allowClear >
        {stData?.getAllStructures.map((s:any)=>{
            return <option key={s._id} value={s._id}>{s.bina_no} </option>
        })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="default" htmlType="submit">
          Kaydet
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