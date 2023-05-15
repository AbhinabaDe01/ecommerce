import React from 'react'
import Link from 'next/link'

//url for image inside our santy dashboard
import { urlFor } from '../lib/client'

const Product = ({ product }) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className='product-card'>
          <img 
          src={urlFor(product.image && product.image[0])}  //beacuse we will have multiple images for our each product
          width={250}
          height={250}
          className='product-image'
          />
          <p className='product-name'>{product.name}</p>
          <p className='product-price'>₹{product.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product