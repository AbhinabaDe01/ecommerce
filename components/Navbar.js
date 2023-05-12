import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'

import Cart from './Cart'
import { useStateContext } from '../context/StateContext'

import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {

  const {showCart, setShowCart, totalQuantities} = useStateContext()

  const { user, error, isLoading } = useUser();

  return (
    <div className='navbar-container'>
      <p>
        <Link href='/'><h2>E Mart</h2></Link>
      </p>

      
      <button className='cart-icon' onClick={() => setShowCart(true)}>    
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {
        user 
        ? 
        <p><a href="/api/auth/login">Login</a></p>
        :
        <p><a href="/api/auth/logout">Logout</a></p>
      }

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar