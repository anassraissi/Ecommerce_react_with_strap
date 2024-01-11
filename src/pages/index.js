
import React from 'react'
import { Header,Footer,product, Product } from "../../Components/index.jsx";
import { client } from '../../lib/client.js';
 const Home=({products,bannerData})=> {
  return (
    <>
    {console.log(bannerData[0])}
    <Header banner={bannerData[0]} />
    <div className='products-heading'>
      <h2>best selling Products</h2>
      <p>Speakers pf many Variations</p>
    </div> 
    <div className='products-container'>
      {products?.map((product)=> <Product key={product._id} product={product}/> )}
    </div>
      <Footer FooterBanner={bannerData && bannerData[0]}/>
    </>
  )
}
export const getServerSideProps=async()=>{
  const query='*[_type=="product"]';    
  //In the query *[_type=="product"], you are querying for documents of type "product" in Sanity.  => name in file shema

  // This query is using the GROQ (Graph-Relational Object Queries) language, which is specific to Sanity.


  const products=await client.fetch(query)
  const bannerQuery='*[_type=="banner"]';
   //In the query *[_type=="product"], you are querying for documents of type "product" in Sanity.  => name in file shema

  // This query is using the GROQ (Graph-Relational Object Queries) language, which is specific to Sanity
  const bannerData=await client.fetch(bannerQuery)
  return{
      props:{
        products,bannerData
      }
  }
}

export default Home