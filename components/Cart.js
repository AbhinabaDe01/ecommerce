import React, { useRef } from 'react'

//importing icons
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineLeft } from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'

//importing toast for message display
import { Toast } from 'react-hot-toast'

//importing context
import { useStateContext } from '../context/StateContext'

//importing urlfor for image display
import { urlFor } from '../lib/client'

//importing Link from next library to direct to specefic urls
import Link from 'next/link'

const Cart = ( ) => {
  //using useref
  const cartRef = useRef()

  //destructuring from the context
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext()
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>

        <button
        type='button'
        className='cart-heading'
        onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            <h3>Your Shopping Bag is Empty</h3>
            <Link href='/'>
              <button
              type='button'
              onClick={() => setShowCart(false)}
              className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} 
              className='cart-product-image'
              />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>{item.quantity}</span>
                        <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                          <AiOutlinePlus />
                        </span>
                    </p>
                  </div>
                  <button
                  type='button'
                  className='remove-item'
                  onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                    
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
              type='button'
              className='btn'
              onClick=""
              >
                Pay Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart