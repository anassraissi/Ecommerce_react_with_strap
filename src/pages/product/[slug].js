import React, { useState } from 'react'
import { client, urlFor } from '../../../lib/client'
import { AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar} from 'react-icons/ai';
import { Product } from '../../../Components';
import { useStateContext } from '../../../Context/StateContext';

const ProductDetails = ({product,products}) => {
  const{image,price,name,details}=product;
  const [index,setIndex]=useState(0);
  const {incQty,DecQty,qty,onAdd}=useStateContext();
  // console.log(image);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
        <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}   
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
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
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus"><AiOutlineMinus onClick={DecQty} /></span>
              <span className="num">{qty}</span>
              <span className="plus"><AiOutlinePlus onClick={incQty} /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={()=>onAdd(product,qty)}>Add to Cart</button>
            <button type="button" className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;
  const products = await client.fetch(query);
  // console.log(products);
  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));
  // console.log(paths);
  return {
    paths,
    fallback: 'blocking' 
    /**
     * fallback: 'blocking': This means that if a request comes in for a path that hasn't been generated at build time, 
     * Next.js will generate the page on-the-fly and cache the result for future requests.
     *  The user will see a loading state during this process.
     */
  }
}
    export const getStaticProps=async({params:{slug}})=>{
        const productQuery=`*[_type=="product" && slug.current=='${slug}'][0]`;    
        const product=await client.fetch(productQuery)
        const productsQuery=`*[_type=="product"]`;    
        const products=await client.fetch(productsQuery)
        console.log(products);
        return{props:{product,products}}
    }



export default ProductDetails