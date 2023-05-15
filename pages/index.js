import React, {useState} from 'react'

//import sanity client
import {client} from '../lib/client'

//components
// import { Product, FooterBanner, HeroBanner } from '../components'
import Product from '../components/Product'
import FooterBanner from '../components/FooterBanner'
import HeroBanner from '../components/HeroBanner'

const Home = ({products, bannerData}) => {
  console.log(products)

  const [data, setData] = useState(products)

  const showNeckbands = () => {
    const neckbands = products.filter(product => product.category == 'neckband')
    setData(neckbands)
  } 

  const showSmartwatchs = () => {
    const smartwatches = products.filter(product => product.category == 'smartwatch')
    setData(smartwatches)
  }

  const showHeadphones = () => {
    const headphones = products.filter(product => product.category == 'headphone')
    setData(headphones)
  }

  const showSpeakers = () => {
    const speakers = products.filter(product => product.category == 'speaker')
    setData(speakers)
  }

  const showAll = () => {
    setData(products)
    // document.getElementById('all').style.backgroundColor = 'red'
  }

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='filter-list'>
        <p onClick={() => showAll()} id='all'>All</p>
        <p onClick={() => showHeadphones()} id='headphones'>Headphones</p>
        <p onClick={() => showSpeakers()} id='speakers'>Speakers</p>
        <p onClick={() => showSmartwatchs()} id='smartwatches'>Smartwatches</p>
        <p onClick={() => showNeckbands()} id='neckbands'>Neckbands</p>
      </div>

      {/* <div className='products-container'>
        {products?.map((product) => <Product key={product._id}  product={product}/>)}
      </div> */}

      {data && (
        <div className='products-container'>
          {data?.map((product) => <Product key={product._id}  product={product}/>)}
        </div>
      )}

      <FooterBanner footerBanner = {bannerData && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  //grab all the products from our sanity dashboard 
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  //return the fetched data
  return {
    props: { products, bannerData }
  }
}

export default Home