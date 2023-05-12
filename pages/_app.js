import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

import Layout from '../components/Layout'

import { StateContext } from '../context/StateContext'

import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <UserProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </StateContext>
  )
}

export default MyApp
