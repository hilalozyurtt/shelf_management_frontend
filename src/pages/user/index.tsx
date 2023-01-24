import React, { useContext, useState } from 'react';
import AuthContext from "@/context/authContext";
import { useRouter } from 'next/router';
import Link from 'next/link';

const App = () => {
const router = useRouter()
  const {user} :any = useContext(AuthContext)
  const context = useContext(AuthContext)
  if(!user && router.isReady){
    router.push('/')
  }else {
    return (
      <>
      <h1 className='text-2xl'>Kişisel Bilgilerim</h1>
      <h1>İsmi    : {user?.username}</h1>
      <h1>Soy İsmi: {user?.usersurname}</h1>
      <h1>Telefon : {user?.phone}</h1>
      <h1>Yetki   : {user?.role}</h1>
      <Link href={{pathname:"user/update_user", query:{id:user._id}}}>Güncelle</Link>
      </>
    );
  }
};

export default App;