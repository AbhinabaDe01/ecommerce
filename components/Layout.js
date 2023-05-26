import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'


//in next js, if we want to show some components all the time irrespective of the 
//urls that we are visiting, we have to wrap the child components around the components that we always
//want to show

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>E mart</title>
        <link rel="Website icon" href="myicon_round.png" />
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout