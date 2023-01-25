import React, { useContext, useState } from 'react';
import AuthContext from "@/context/authContext";
import { Button, Space } from 'antd';
import Link from 'next/link';

const App = () => {

  const { user }: any = useContext(AuthContext)

  return (
    <>
      <h1 className='text-2xl'>Kişisel Bilgilerim</h1>
      <h1>İsmi    : {user?.username}</h1>
      <h1>Soy İsmi: {user?.usersurname}</h1>
      <h1>Telefon : {user?.phone}</h1>
      <h1>Yetki   : {user?.role}</h1>
      <Button><Link href={{ pathname: "user/update_user", query: { id: user?._id } }}>Bilgileri Güncelle</Link></Button>
      <Button><Link href={{ pathname: "user/update_user", query: { id: user?._id } }}>Şifre Değiştir</Link></Button>
      <br />
      {user?.role == "admin" ? <Link className='' href={{ pathname: "user/create_user" }}><Button>Yeni Kullanıcı Oluştur</Button></Link> : ""}
      <br />
    </>
  );

};

export default App;