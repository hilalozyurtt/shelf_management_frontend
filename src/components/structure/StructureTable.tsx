import React, { useRef, useState } from 'react';
import { CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { InputRef, Result, Spin, Tag } from 'antd';
import { Button, Input, message, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { GET_ALL_STRUCTURES, DELETE_STRUCTURE } from '@/modules/resolvers/structureResolvers';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_ALL_SHELFS } from '@/modules/resolvers/shelfResolvers';
import { Modal } from 'antd';

interface DataType {
  _id: string;
  bina_no: string;
  active: boolean;
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
      content: 'Bina Silindi!',
    });
  };

  const fault = () => {
    messageApi.open({
      type: 'error',
      duration: 10,
      content: '',
    });
  };

  const showModal = () => {
    Modal.error({
      title: 'Bu raf dolu!',
      content: 'Silinmek istenen bina raf tablosunda mevcut! Önce raf tablosundan bağlantıyı siliniz.',
    });
  };

  const { data, loading:stLoading, error } = useQuery(GET_ALL_STRUCTURES)
  const { data:shData, loading:shLoading, error:shError } = useQuery(GET_ALL_SHELFS)
  const [deleteStructure, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_STRUCTURE)

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


  const kontrol = async (baglanti : any) => {
    const baglantiVarMi = shData?.getAllShelfs.find((s:any) => s.structure_id === baglanti)
    return (baglantiVarMi) ? true : false
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
      title: 'BINA NUMARASI',
      dataIndex: 'bina_no',
      key: 'bina_no',
      width: '30%',
      ...getColumnSearchProps('bina_no'),
      sorter: (a, b) => ((a.bina_no < b.bina_no) ? 1 : (a.bina_no > b.bina_no ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
    },
    { 
      title: 'EKLEME TARIHI',
      dataIndex: 'created_at',
      key: 'created_at',
      ...getColumnSearchProps('created_at'),
      sorter: (a, b) => ((a.created_at < b.created_at) ? 1 : (a.created_at > b.created_at ? -1 : 0) ),
      sortDirections: ['descend', 'ascend'],
      render: (_ , record) => (
        <span>{new Date(record.created_at).toLocaleString("tr-TR")}</span>
      )
    },
    {
      title: 'SON GUNCELLEME TARIHI',
      dataIndex: 'updated_at',
      key: 'updated_at',
      ...getColumnSearchProps('updated_at'),
      sorter: (a, b) => ((a.created_at < b.created_at) ? 1 : (a.created_at > b.created_at ? -1 : 0) ),
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
          <Link href={{ pathname: "/structure/update_structure", query: { id: record._id } }}><Tag color={"gold"}><EditOutlined /> Düzenle</Tag></Link>
          <button onClick={async () => {
                    const sonuc =await kontrol(record._id)
                    if (sonuc){
                      showModal()
                    }
                    else{
                      await deleteStructure({
                        variables: {
                          input: { _id: record._id }
                        }, refetchQueries: [GET_ALL_STRUCTURES]
                      })
                      success()
                    }
                    
                  }}><Tag color={"red"}><DeleteOutlined /> Sil</Tag></button>
        </Space>
      ),
    },
  ];
  const newData = columns.filter((d: any) => {
    return d.dataIndex != "updated_at"
  })


  if(stLoading || deleteLoading || shLoading ) return (
    <><Result
    icon={<Spin size="large" />}
  /></>
  )

  if(error || deleteError || shError ) return (
    <><Result
    status="500"
    title="500"
    subTitle="Üzgünüz, bir hata oluştu."
  /></>
  )

  return (
    <>
      {contextHolder}
      <Table  columns={newData} dataSource={data?.getAllStructures} />
      <Space style={{ margin: 24 }}>
        <Button><Link href={"structure/create_structure"}>Bina Oluştur</Link></Button>
      </Space>
    </>
  );
  
};

export default App;