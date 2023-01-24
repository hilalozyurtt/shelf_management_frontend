import React, { useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { InputRef, Tag } from 'antd';
import { Button, Input, message, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { DELETE_SHELF, GET_ALL_SHELFS } from '@/modules/resolvers/shelfResolvers';
import { GET_ALL_STRUCTURES } from '@/modules/resolvers/structureResolvers';

interface DataType {
  _id: string;
  raf_no: string;
  structure_id: string;
  activate: boolean;
  created_at: string;
  updated_at: string;
}

type DataIndex = keyof DataType;


const App: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Raf Silindi!',
    });
  };

  const { data, loading:shLoading, error } = useQuery(GET_ALL_SHELFS)
  const [deleteShelf, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_SHELF)
  const {data:stData,loading:stLoading, error: stError} = useQuery(GET_ALL_STRUCTURES)

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
      title: 'RAF NUMARASI',
      dataIndex: 'raf_no',
      key: 'raf_no',
      width: '30%',
      ...getColumnSearchProps('raf_no'), 
      sorter: (a, b) =>  ((a.raf_no < b.raf_no) ? 1 : (a.raf_no > b.raf_no ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'BINA NUMARASI',
      dataIndex: 'structure_id',
      key: 'structure_id',
      width: '20%',
      ...getColumnSearchProps('structure_id'),
      sorter: (a, b) =>{ 
          const aStructure = stData?.getAllStructures.find((s:any) => s._id === a.structure_id)?.bina_no      
          const bStructure = stData?.getAllStructures.find((s:any) => s._id === b.structure_id)?.bina_no
        return ((aStructure < bStructure) ? 1 : (aStructure > bStructure ? -1 : 0) )
      },
      sortDirections: ['descend', 'ascend'],
      render: (_ , record) => (
        <span>{stData?.getAllStructures.find((s:any)=>s._id == record.structure_id )?.bina_no}</span>
      )
    },
    {
      title: 'EKLEME TARIHI',
      dataIndex: 'created_at',
      key: 'created_at',
      ...getColumnSearchProps('created_at'),
      sorter: (a, b) => ((a.created_at < b.created_at) ? 1 : (a.created_at > b.created_at ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
      render: (_ , record) => (
        <span>{new Date(record.updated_at).toLocaleString("tr-TR")}</span>
      )
    },
    {
      title: 'SON GUNCELLEME TARIHI',
      dataIndex: 'updated_at',
      key: 'updated_at',
      ...getColumnSearchProps('updated_at'),
      sorter: (a, b) => ((a.updated_at < b.updated_at) ? 1 : (a.updated_at > b.updated_at ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
      render: (_ , record) => (
        <span>{new Date(record.updated_at).toLocaleString("tr-TR")}</span>
      )
    },
    {
      title: 'ISLEM',
      key: 'islem',
      render: (_, record) => (
        <Space size="middle">
          <Link href={{ pathname: "/shelf/update_shelf", query: { id: record._id } }}><Tag color={"gold"}><EditOutlined /> Düzenle</Tag></Link>
          <button onClick={async () => {
                    await deleteShelf({
                      variables: {
                        input: { _id: record._id }
                      }, refetchQueries: [GET_ALL_SHELFS]
                    })
                    success()
                  }}><Tag color={"red"}><DeleteOutlined /> Sil</Tag></button>
        </Space>
      ),
    },
  ];

  return (
    <>
    {contextHolder}
      <Table  columns={columns} dataSource={data?.getAllShelfs} />
      <Space style={{ margin: 24 }}>
        <Button><Link href={"shelf/create_shelf"}>Raf Oluştur</Link></Button>
      </Space>
    </>
  );
  
};

export default App;