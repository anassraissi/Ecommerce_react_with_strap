import Link from 'next/link'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from '../Context/StateContext';
import { urlFor } from '../lib/client';
const Cart = () => {
  const cartRef=useRef();
  const {totalPrice,totalQuantity,cartItem,setshowCart}=useStateContext();

  return (
    <div className='cart-wrapper' ref={cartRef}>
          <div className='cart-container'>
            <button type='button' className='cart-heading' onClick={()=>setshowCart(false)}>
            <AiOutlineLeft/>
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantity} items  walo )</span>
            </button>
          </div>
    </div>
  )
}

export default Cart