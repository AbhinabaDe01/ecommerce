import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'

import toast from 'react-hot-toast' //for popup notification

import Cart from './Cart'
import { useStateContext } from '../context/StateContext'

import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {

  const {showCart, setShowCart, totalQuantities} = useStateContext()

  const { user, error, isLoading } = useUser();

  console.log(user);

  const handleShowCart = () => {
    if(user){
      setShowCart(true)
    }else{
      toast.error('Please login to view your cart')
    }
  }

  return (
    <div className='navbar-container'>
      <p>
        <Link href='/'><h2>E Mart</h2></Link>
      </p>

      
      <button className='cart-icon' onClick={handleShowCart}>    
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {
        user 
        ? 
        <div className='auth-list'>
          <p><Link href="/profile">Profile</Link></p>
          <p className='auth-btn'><Link href="/api/auth/logout">Logout</Link></p>
        </div>
        :
        <p className='auth-btn'><Link href="/api/auth/login">Login</Link></p>
        
      }

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar