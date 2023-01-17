import Link from "next/link";
import React from 'react';
import Image from 'next/image'
import { AreaChartOutlined, BankOutlined, ExperimentOutlined, InboxOutlined, LogoutOutlined, SettingOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Router from "next/router";
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = (props: any) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuName = ["Kullanıcılar", "Ürün Yönetimi", "Raf Yönetimi", "Bina Yönetimi", "Ayarlar", "Sistem Logları", "Kullanıcı Çıkışı"]
  const urls = ["/user", "/product", "/shelf", "/structure", "/settings", "/system_logs", "/logout"]
  return (
    <Layout className=" min-h-screen h-fit">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo text-white max-h-20 mx-auto"><Image src={"/logo.png"} height={50} width={150} alt={""} style={{maxHeight:"120px", paddingBottom:"10px"}} /></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            { props.children }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;