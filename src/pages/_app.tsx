import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '@/modules/apolloClient'
import Sidebar from '../components/layout/Sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return (<ApolloProvider client={client}><Sidebar><Component {...pageProps} /></Sidebar></ApolloProvider>)
}
