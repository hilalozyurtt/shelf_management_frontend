import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '@/modules/apolloClient'
import Sidebar from '../components/layout/Sidebar';
import { AuthProvider } from '@/context/authContext';

export default function App({ Component, pageProps }: AppProps) {
  //@ts-ignore
  return (<AuthProvider><ApolloProvider client={client}><Sidebar><Component {...pageProps} /></Sidebar></ApolloProvider></AuthProvider>)
}
