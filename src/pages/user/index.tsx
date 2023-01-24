import React, { useContext, useState } from 'react';
import AuthContext from "@/context/authContext";
import { useRouter } from 'next/router';

const App = () => {
const router = useRouter()
  const {user} = useContext(AuthContext)
  const context = useContext(AuthContext)
  if(!user && router.isReady){
    router.push('/')
  }else {
    return (
      <h1>Buraya Kullanıcı Detay Gelecek</h1>
    );
  }
};

export default App;