import React from 'react'
import { client } from '../../../lib/client'

const ProductDetails = () => {
  return (
    <div>product</div>
  )
}
    export const getStaticProps=async({params:{slug}})=>{
        const productQuery=`*[_type=="product" && slug.current=='${slug}'][0]`;    
        const product=await client.fetch(productQuery)
        const productsQuery=`*[_type=="product" && slug.current=='${slug}'][0]`;    
        const products=await client.fetch(productsQuery)
        console.log(product);
        return{props:{product,products}}
    }

export default ProductDetails