import React, { useContext, useState } from 'react';
import AuthContext from "@/context/authContext";
import { useRouter } from 'next/router';
import { Button, Space } from 'antd';
import Link from 'next/link';

const App = () => {
const router = useRouter()
  const {user} :any = useContext(AuthContext)
  const context = useContext(AuthContext)
  if(!user && router.isReady){
    router.push('/')
    return(<></>)
  }else {
    return (
      <>
      <h1 className='text-2xl'>Kişisel Bilgilerim</h1>
      <h1>İsmi    : {user?.username}</h1>
      <h1>Soy İsmi: {user?.usersurname}</h1>
      <h1>Telefon : {user?.phone}</h1>
      <h1>Yetki   : {user?.role}</h1>
      <Button><Link href={{pathname:"user/update_user", query:{id:user?._id}}}>Güncelle</Link></Button>
      <br />
      { user?.role == "admin" ? <Link className='' href={{pathname: "user/create_user"}}><Button>Yeni Kullanıcı Oluştur</Button></Link> : ""}
      </>
    );
  }
};

export default App;