import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'
import product from '../sanitty/schemas/product'
 
const Product = ({product:{image,name,slug,price}}) => { // declari dack li bghina bla man diro product.name 
  return (
    <div>
        <Link href={`/product/${slug.current}`}>
            <div className='product-card'>
            <img src={urlFor(image && image[0])} width={250} height={250} alt="" />
            <p className='product-name'>{name}</p>
            <p className='product-price'>{price} $</p>
            </div>
        </Link>
    </div>
  )
}

export default Product