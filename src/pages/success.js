import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../Context/StateContext';
import { BsBagCheckFill } from "react-icons/bs";
import { FireWorks } from '../../lib/utils';

const Success = () => {
    const {setcartItems,settotalPrice,settotalQuantity}=useStateContext();
    useEffect(()=>{
        setcartItems([]);
        settotalPrice(0);
        settotalQuantity(0);
        FireWorks();
    },[])
  return (
    <div className='success-wrraper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your Order ! </h2>
            <p className='email-msg'>Check your email inbox for the receipt .</p>
            <p className='description'>
                If you have any questions, please email 
                <a className='email' href='mailto:order@example.com'>
                        order@example.com        
                 </a>
            </p>
            <Link href='/'>
                    <button type='button' width='300px' className='btn'>
                        Continue shopping
                    </button>
            </Link>


        </div>

    </div>
  )
}

export default Success