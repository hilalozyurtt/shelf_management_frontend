
import React, { useContext, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import Image from 'next/image'
import Router from "next/router";
import { AreaChartOutlined, BankOutlined, ExperimentOutlined, InboxOutlined, LogoutOutlined, SettingOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
import Login from './Login';
import { useLazyQuery } from '@apollo/client';
import { LOGOUT } from '@/modules/resolvers/userResolvers';
import { useRouter } from 'next/router';
import AuthContext from '@/context/authContext';

export default function SiderComp(props: any) {

  const router = useRouter()
  const context = useContext(AuthContext)
  const [logout, { data: lData, loading: lLoading, error: lError }] = useLazyQuery(LOGOUT, { fetchPolicy: "no-cache" })
  const { token: { colorBgContainer }, } = theme.useToken();
  const menuName = ["Bilgilerim", "Ürün Yönetimi", "Raf Yönetimi", "Sistem Logları", "Ayarlar", "Kullanıcı Çıkışı"]
  const urls = ["/user", "/product", "/shelf", "/system_logs", "/settings", "/logout"]

  return (
    <>
      <Layout className=" min-h-screen h-fit ">
        <Sider
          className="border-r-2"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
          }}
          onCollapse={(collapsed, type) => {
          }}
        >
          <div  className="logo text-white max-h-20 mx-auto "><Image src={"/hill.png"} height={100} width={300} alt={""} style={{ maxHeight: "190px", maxWidth: "160px", paddingBottom: "65px" , marginLeft: "20px"}} /></div>
          <br />
          {props?.user ? <span className='text-md text-white pl-7'>Hoşgeldin <span className='text-green-600'>{props.user.username}</span></span> : ""}
          {props?.user ? <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['']}
            items={[UserOutlined, ExperimentOutlined, InboxOutlined, AreaChartOutlined, SettingOutlined, LogoutOutlined].map(
              (icon, index) => {
                if (icon == LogoutOutlined) {
                  return {
                    key: String(index + 1),
                    icon: React.createElement(icon),
                    label: `${menuName[index]}`,
                    onClick: async () => {
                      await logout();
                      context.logout()
                      router.reload()
                    }
                  }
                }
                return {
                  key: String(index + 1),
                  icon: React.createElement(icon),
                  label: `${menuName[index]}`,
                  onClick: () => {
                    Router.push(urls[index])
                  }
                }
              },
            )}
          /> : ""}

        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} className="bg-white dark:bg-slate-800 border-b-2 border-amber-50">
            <h1 className="text-2xl font-bold text-white" style={{ margin: '20px 24px 0' }} > RAF YERİ YÖNETİM SİSTEMİ </h1>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              {props.login ? <Login /> : ""}
              {props.children ? props.children : ""}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  )
}