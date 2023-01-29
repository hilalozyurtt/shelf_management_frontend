import React, { useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { InputRef, Tag } from 'antd';
import { Button, Input, message, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_ALL_SYSTEM_LOGS } from '../../modules/resolvers/systemLogResolvers';

interface DataType {
  _id: string;
  user_name: string;
  changed_value: string;
  action: string;
  created_at: string;
}

type DataIndex = keyof DataType;


const App: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const { data, loading:stLoading, error } = useQuery(GET_ALL_SYSTEM_LOGS)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Sıfırla
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtre
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'KULLANICI İSMİ',
      dataIndex: 'user_name',
      key: 'user_name',
      width: '30%',
      ...getColumnSearchProps('user_name'),
      //sorter: (a, b) => Number(a.bina_no) - Number(b.bina_no),
      //sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'DEĞİŞTİRDİĞİ VERİ',
      dataIndex: 'changed_value',
      key: 'changed_value',
      width: '30%',
      ...getColumnSearchProps('changed_value'),
      //sorter: (a, b) => Number(a.bina_no) - Number(b.bina_no),
      //sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'EYLEM',
      dataIndex: 'action',
      key: 'action',
      ...getColumnSearchProps('action'),
      //sorter: (a, b) => Number(a.bina_no) - Number(b.bina_no),
      //sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'TARIH',
      dataIndex: 'created_at',
      key: 'created_at',
      ...getColumnSearchProps('created_at'),
      sorter: (a, b) => a.created_at.length - b.created_at.length,
      sortDirections: ['descend', 'ascend'],
      render: (_ , record) => (
        <span>{new Date(record.created_at).toLocaleString("tr-TR")}</span>
      )
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data?.getAllSystemLogs} />
    </>
  );
  
};

export default App;