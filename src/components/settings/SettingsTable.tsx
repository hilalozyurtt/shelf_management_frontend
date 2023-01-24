import React from 'react';
import { Dropdown, MenuProps, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  aciklama: string;
}

const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Evet',
    },
    {
        key: '2',
        label: 'Hayır',
      },
  ];

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
        <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>    
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
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