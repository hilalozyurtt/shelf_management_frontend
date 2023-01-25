import React, { useState } from 'react';
import { Dropdown, MenuProps, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownOutlined } from '@ant-design/icons';

const [inputs, setInputs] = useState({key:"" ,secenek:""})

interface DataType {
  key: string;
  aciklama: string;
}

const handleChange = (value: string) => {
    console.log("blablablablablabla");   
    console.log(`selected ${value}`);
    setInputs(values => ({ ...values, ["secenek"]: value }))
};


const columns: ColumnsType<DataType> = [
  {
    title: 'Açıklama',
    dataIndex: 'aciklama',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Seçenek',
    dataIndex: 'secenek',
    render: (_, record) => (
        // Evet- hayırı nasıl taşısam düşünüyorum
        
        <Select
          defaultValue="true"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'true', label: 'Evet' },
            { value: 'false', label: 'Hayır' },
          ]}
        />
      ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    aciklama: 'Ürün Tablosuna Eklenme Tarihi Eklensin mi ?',
  },
  {
    key: '2',
    aciklama: 'Ürün Tablosuna Güncellenme Tarihi Eklensin mi ?',
  }, 
];

const App: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    // Burayı bold yapamadım 
    //title={() => 'Sistem Parametreleri'} 
  />
);

export default App;