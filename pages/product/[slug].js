//this component is dynamic according to the respective slugs that we look for, that is why it is in square brackets
import React , {useState} from 'react'

//importing the client for sanity databse and urlfor for image display purpose
import {client, urlFor} from '../../lib/client'

//importing icons
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

//importing the product components to show in the similar products section
// import { Product } from '../../components';
import Product  from '../../components/Product';

//importing the context
import { useStateContext } from '../../context/StateContext';


import { useUser } from '@auth0/nextjs-auth0/client';

import {toast} from 'react-hot-toast' //for popup notification



const ProductDetails = ({ products, product }) => {

    const {image, name, details, price, category} = product;

    const [index, setIndex] = useState(0)

    const [similar, setSimilar] = useState([])

    const similarProducts = products.filter(item => item.category === product.category)

    const { user, error, isLoading } = useUser();

    

    //destructuring from the context to add the increment/decrement of quantity and
    //add items to the cart or directly buy and go to the payment checkout page
    const {qty, incQty, decQty, onAdd, setShowCart} = useStateContext()

    const handleBuyNow = () => {
        if(user) {
            onAdd(product, qty);

            setShowCart(true);
        }
        toast.error('Login first to view cart or to buy')
    }
   
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index])} 
                    className='product-detail-image'
                    />
                </div>

                <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img 
                        src={urlFor(item)}
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        onMouseEnter={() => setIndex(i)}
                        key={i}
                        />
                    ))}
                </div>

            </div>

            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>
                        (20)
                    </p>
                </div>
                <h4>
                    Details: 
                </h4>
                <p>{details}</p>
                <p className='price'><span>Price: </span>₹{price}</p>
                <div className='quantity'>
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                        <span className='num' >{qty}</span>
                        <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                    </p>
                </div>

                <div className='buttons'>
                    <button type="button" className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
                    <button type="button" className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>

        {/* <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
        </div> */}

        <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {similarProducts.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
        </div>

    </div>
  )
}

//it generates all the paths that are extracted from the product array as a separate slug
//that we can use in the url
export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{

        slug {
            current
        }

    }

    `

    const products = await client.fetch(query)

    //we are then mapping through all the products and generating slug, which is obtained by
    //slug.current value
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    //grab all the products from our sanity dashboard and grab the current slug registered in the product
    //and grab that item, 0th item is the item that we want to grab 
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`

    //to grab similar products
    const productsQuery = '*[_type == "product"]'

    //fetching individual product 
    const product = await client.fetch(query)
    //fetching all similar products
    const products = await client.fetch(productsQuery)
  
    //return the fetched data
    return {
      props: { product, products }
    }
}

export default ProductDetails