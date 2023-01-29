import React, { useRef, useState } from 'react';
import { CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { InputRef, Result, Spin, Tag } from 'antd';
import { Button, Input, message, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { DELETE_SHELF, GET_ALL_SHELFS } from '@/modules/resolvers/shelfResolvers';
import { GET_ALL_STRUCTURES } from '@/modules/resolvers/structureResolvers';
import { GET_ALL_PRODUCTS } from '@/modules/resolvers/productResolvers';
import { Modal } from 'antd';

interface DataType {
  _id: string;
  raf_no: string;
  bina_no: string;
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

  const showModal = () => {
    Modal.error({
      title: 'Bu raf dolu!',
      content: 'Silinmek istenen bina raf tablosunda mevcut! Önce raf tablosundan bağlantıyı siliniz.',
    });
  };

  const { data, loading:shLoading, error } = useQuery(GET_ALL_SHELFS)
  const [deleteShelf, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_SHELF)
  const {data:stData,loading:stLoading, error: stError} = useQuery(GET_ALL_STRUCTURES)
  const {data:pData,loading:pLoading, error: pError} = useQuery(GET_ALL_PRODUCTS)

  const kontrol = async (baglanti : any) => {
    const baglantiVarMi = pData?.getAllProducts.find((s:any) => s.shelf_id === baglanti)
    return (baglantiVarMi) ? true : false
  };

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
          <Button type="default"
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
              clearFilters && handleReset(clearFilters)
              handleSearch(selectedKeys as string[], confirm, dataIndex)
              clearFilters && handleReset(clearFilters)
            }}
          >
            Filtreyi Kaldır
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => {
              close();
            }}
          >
            <CloseOutlined />
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
      title: 'BİNA NUMARASI',
      dataIndex: 'bina_no',
      key: 'bina_no',
      width: '30%',
      ...getColumnSearchProps('bina_no'), 
      sorter: (a, b) =>  ((a.bina_no < b.bina_no) ? 1 : (a.bina_no > b.bina_no ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'EKLEME TARİHİ',
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
      title: 'GÜNCELLENME TARİHİ',
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
      title: 'İŞLEM',
      key: 'islem',
      render: (_, record) => (
        <Space size="middle">
          <Link href={{ pathname: "/shelf/update_shelf", query: { id: record._id } }}><Tag color={"gold"}><EditOutlined /> Düzenle</Tag></Link>
          <button onClick={async () => {
                    const sonuc = await kontrol(record._id)
                    if (sonuc){
                      showModal()
                    }
                    else{
                      await deleteShelf({
                        variables: {
                          input: { _id: record._id }
                        }, refetchQueries: [GET_ALL_SHELFS]
                      })
                      success()
                    }
                }}><Tag color={"red"}><DeleteOutlined /> Sil</Tag></button>
        </Space>
      ),
    },
  ];

  if(shLoading || deleteLoading || stLoading || pLoading) return (
    <Result
      icon={<Spin size="large" />}
    />
  )

  if(error || deleteError || stError || pError ) return (
    <Result
      status="500"
      title="500"
      subTitle="Üzgünüz, bir hata oluştu."
  />
  )

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