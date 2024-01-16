import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from '../Context/StateContext';
import Cart from './Cart';


const Navba = () => {
  const{showCart,setshowCart,totalQuantity}=useStateContext();
  return (
    <div className='navbar-container'>
          <p className='logo'>
            <Link href='/'>Anass headphones</Link>
          </p>
          <button type='button' className="cart-icon" onClick={()=>setshowCart((prev)=>(prev==false)? true : false)}>
            <AiOutlineShopping/>
            <span className="cart-item-qty">{totalQuantity}</span>
          </button>
          {showCart && <Cart/>}
    </div>
  )
}

export default Navba