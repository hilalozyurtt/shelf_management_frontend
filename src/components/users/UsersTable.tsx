import React, { useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { InputRef, Tag } from 'antd';
import { Button, Input, message, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_USER, GET_ALL_USERS } from '@/modules/resolvers/userResolvers';


interface DataType {
  _id: string;  
  username: string;
  usersurname: string;
  phone: string;
  role: string;
}

type DataIndex = keyof DataType;


const App: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { data, loading, error } = useQuery(GET_ALL_USERS)
  const [deleteUser, {data: dData, loading: dLoaing, error: dError}] = useMutation(DELETE_USER)

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Kullanıcı Silindi!',
    });
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
      title: 'İsim',
      dataIndex: 'username',
      key: 'username',
      width: '30%',
      ...getColumnSearchProps('username'),
      sorter: (a, b) => ((a.username < b.username) ? 1 : (a.username > b.username ? -1 : 0)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Soy İsim',
      dataIndex: 'usersurname',
      key: 'usersurname',
      width: '30%',
      ...getColumnSearchProps('usersurname'),
      sorter: (a, b) => ((a.usersurname < b.usersurname) ? 1 : (a.usersurname > b.usersurname ? -1 : 0)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      width: '30%',
      ...getColumnSearchProps('role'),
      sorter: (a, b) => ((a.role < b.role) ? 1 : (a.role > b.role ? -1 : 0)),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'ISLEM',
      key: 'islem',
      render: (_, record) => (
        <Space size="middle">
          <Link href={{ pathname: "/users/update_user_password", query: { id: record._id } }}><Tag color={"gold"}><EditOutlined /> Düzenle</Tag></Link>
          <button onClick={async () => {
            await deleteUser({variables: { input: {
              _id:record._id

            }},refetchQueries:[GET_ALL_USERS]})
            success()
          }}>
          <Tag color={"red"}><DeleteOutlined /> Sil</Tag></button>
        </Space>
      ),
    },
  ];
  if(loading) return <div>Loading</div>
  if(error) return <div>Error</div>
  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={data?.getAllUsers} />
      <Space style={{ margin: 24 }}>
        <Button><Link href={"/users/create_user"}>Kullanıcı Oluştur</Link></Button>
      </Space>
    </>
  );

};

export default App;