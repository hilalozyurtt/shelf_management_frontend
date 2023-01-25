import Link from "next/link";
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image'
import { AreaChartOutlined, BankOutlined, ExperimentOutlined, InboxOutlined, LogoutOutlined, SettingOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Router from "next/router";
import AuthContext from "@/context/authContext";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CHECK_TOKEN, LOGOUT } from "@/modules/resolvers/userResolvers";
import { useRouter } from "next/navigation";
import Login from "./Login";
import SiderComp from "./Sider";
const { Header, Content, Footer, Sider } = Layout;


type User = {
  _id: string,
  username: string,
  usersurname: string,
  email: string,
  phone: string,
  role: string
}

const App: React.FC = (props: any) => {

  const { user }: any = useContext(AuthContext)
  const context = useContext(AuthContext)
  const [userState, setUserState] = useState<User>({ _id: "", username: "", usersurname: "", email: "", phone: "", role: "" })

  const [logout, { data: lData, loading: lLoading, error: lError }] = useLazyQuery(LOGOUT, { fetchPolicy: "no-cache" })
  const [fetchUser, { data, loading, error }] = useLazyQuery(CHECK_TOKEN, { fetchPolicy: "no-cache" })

  const router = useRouter()
  useEffect(() => {
    if (user) {
      setUserState(user)
    } else {
      fetchUser()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (data?.checkToken) {
      context.login(data.checkToken)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  const { token: { colorBgContainer }, } = theme.useToken();
  const menuName = ["Bilgilerim", "Ürün Yönetimi", "Raf Yönetimi", "Bina Yönetimi", "Ayarlar", "Sistem Logları", "Kullanıcı Çıkışı"]
  const urls = ["/user", "/product", "/shelf", "/structure", "/settings", "/system_logs", "/logout"]
  if (loading) {
    return (<>
      <SiderComp />
    </>)
  }
  if (user) {
    return (
      // eslint-disable-next-line react/no-children-prop
      <SiderComp user={user} children={props.children} />
    );
  } else {
    return (
      <>
      <SiderComp login={true}/>
      </>
      
    );
  }


};

export default App;