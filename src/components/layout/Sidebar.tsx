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
const { Header, Content, Footer, Sider } = Layout;


type User = {
  _id:string,
  username: string,
  usersurname: string,
  email: string,
  phone: string,
  role: string
}

const App: React.FC = (props: any) => {

  const {user} = useContext(AuthContext)
  const context = useContext(AuthContext)
  const [userState, setUserState] = useState<User>({_id:"",username:"",usersurname:"",email:"",phone:"",role:""})

  const [logout,{data: lData, loading: lLoading, error: lError}] = useLazyQuery(LOGOUT, {fetchPolicy: "no-cache" })
  const [fetchUser, {data,loading, error}] = useLazyQuery(CHECK_TOKEN, {fetchPolicy:"no-cache"})

  const router = useRouter()
  useEffect(()=>{
    if(user){
      setUserState(user)
    }else{
      fetchUser()
    }
  },[user])

  useEffect(()=>{
    if(data?.checkToken){
      context.login(data.checkToken)
    }
  }, [data])


  const { token: { colorBgContainer }, } = theme.useToken();
  const menuName = ["Bilgilerim", "Ürün Yönetimi", "Raf Yönetimi", "Bina Yönetimi", "Ayarlar", "Sistem Logları", "Kullanıcı Çıkışı"]
  const urls = ["/user", "/product", "/shelf", "/structure", "/settings", "/system_logs", "/logout"]
  return (
    <Layout className=" min-h-screen h-fit ">
      <Sider
        className="border-r-2"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo text-white max-h-20 mx-auto "><Image src={"/hill.png"} height={10} width={300} alt={""} style={{maxHeight:"120px", paddingBottom:"10px"}} /></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          items={[UserOutlined, ExperimentOutlined, InboxOutlined, BankOutlined, SettingOutlined, AreaChartOutlined, LogoutOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `${menuName[index]}`,
              onClick: ()=>{
                Router.push(urls[index])
              }
              
            }),
          )}
        />
      </Sider>
      
      <Layout>
        <Header style={{ padding: 0 }} className="bg-white dark:bg-slate-800 border-b-2 border-amber-50">
          <h1 className="text-2xl font-bold text-white" style={{ margin: '20px 24px 0' }} > RAF YERİ YÖNETİM SİSTEMİ </h1>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          { userState?.username ?  <button onClick={async()=>{
            await logout();
            setUserState(()=> {return {_id:"",username:"",usersurname:"",email:"",phone:"",role:"",token:""}})
            router.push('/')
          }}>Çıkış yap</button>: ""}
            {userState?.username ? <span>{userState?.username}</span> : "nouser"}
            { props.children }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;