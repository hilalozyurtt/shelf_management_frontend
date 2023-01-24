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
import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from '@/modules/resolvers/productResolvers';

interface DataType {
  _id: string;
  shelf_id: string;
  name: string;
  arac: string;
  ozellik: string;
  ozellik2: string;
  oem_no: string;
  orjinal_no: string;
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
      content: 'Ürün Silindi!',
    });
  };

  const { data, loading:pLoading, error } = useQuery(GET_ALL_PRODUCTS)
  const [deleteProduct, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_PRODUCT)
  const {data:shData,loading:shLoading, error: shError} = useQuery(GET_ALL_SHELFS)


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
      title: 'ISIM',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => ((a.name < b.name) ? 1 : (a.name > b.name ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'ARAC',
      dataIndex: 'arac',
      key: 'arac',
      width: '20%',
      ...getColumnSearchProps('arac'),
      sorter: (a, b) => ((a.arac < b.arac) ? 1 : (a.arac > b.arac ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'OZELLIK',
      dataIndex: 'ozellik',
      key: 'ozellik',
      width: '20%',
      ...getColumnSearchProps('ozellik'),
      sorter: (a, b) => ((a.ozellik < b.ozellik) ? 1 : (a.ozellik > b.ozellik ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'OZELLIK 2',
      dataIndex: 'ozellik2',
      key: 'ozellik2',
      width: '20%',
      ...getColumnSearchProps('ozellik2'),
      sorter: (a, b) => ((a.ozellik2 < b.ozellik2) ? 1 : (a.ozellik2 > b.ozellik2 ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'OEM NUMARASI',
      dataIndex: 'oem_no',
      key: 'oem_no',
      width: '20%',
      ...getColumnSearchProps('oem_no'),
      sorter: (a, b) => ((a.oem_no < b.oem_no) ? 1 : (a.oem_no > b.oem_no ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'ORJ NUMARASI',
      dataIndex: 'orjinal_no',
      key: 'orjinal_no',
      width: '20%',
      ...getColumnSearchProps('orjinal_no'),
      sorter: (a, b) => ((a.orjinal_no < b.orjinal_no) ? 1 : (a.orjinal_no > b.orjinal_no ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'RAF NUMARASI',
      dataIndex: 'shelf_id',
      key: 'shelf_id',
      width: '20%',
      ...getColumnSearchProps('shelf_id'),
      sorter: (a, b) =>{ 
        const aShelf = shData?.getAllShelfs.find((s:any) => s._id === a.shelf_id)?.raf_no      
        const bShelf = shData?.getAllShelfs.find((s:any) => s._id === b.shelf_id)?.raf_no
      return ((aShelf < bShelf) ? 1 : (aShelf > bShelf ? -1 : 0) )
    },
      sortDirections: ['descend', 'ascend'],
      render: (_ , record) => (
        <span>{shData?.getAllShelfs.find((s:any)=>s._id == record.shelf_id )?.raf_no}</span>
      )
    },
    {
      title: 'ISLEM',
      key: 'islem',
      render: (_, record) => (
        <Space size="middle">
          <Link href={{ pathname: "/product/update_product", query: { id: record._id } }}><Tag color={"gold"}><EditOutlined /> Düzenle</Tag></Link>
          <button onClick={async () => {
                    await deleteProduct({
                      variables: {
                        input: { _id: record._id }
                      }, refetchQueries: [GET_ALL_PRODUCTS]
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
      <Table  columns={columns} dataSource={data?.getAllProducts} />
      <div className='justify-center'>
      <Space style={{ margin: 24 , width:100, justifyContent: 'center'}} >
        <div className='justify-center'><Button><Link href={"product/create_product"}>Ürün Oluştur</Link></Button></div>   
      </Space>
      </div>

    </>
  );
  
};

export default App;