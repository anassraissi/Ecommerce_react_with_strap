import toast from "react-hot-toast";

const { createContext, useContext, useState } = require("react");

const Contex=createContext();

export const StateContext=({children})=>{
    const [showCart, setshowCart] = useState(false);
    const [cartItem, setcartItem] = useState([]);
    const [totalPrice, settotalPrice] = useState();
    const [totalQuantity, settotalQuantity] = useState(0);
    const [qty, setqty] = useState(1);
    const incQty=()=>{
        setqty((prev)=> prev +1);
    }
    const DecQty=()=>{
        setqty((prev)=>{
            return (prev-1<1)? 0: prev-1;
        });
    }
    const onAdd=(product,quantity)=>{
        const checkProductInCart=cartItem.find((item)=>product._id==item._id)
        if(checkProductInCart){
        settotalPrice((prevTotalPrice)=>prevTotalPrice+product.price*quantity);
        settotalQuantity((prevTotalQuantity)=>prevTotalQuantity+quantity)
        
        const updateCartItem=cartItem.map((cartProduct)=>{
            if(product._id==cartProduct._id) return {
                ...cartProduct,
                quantity:cartProduct+quantity
            }
        })
        setcartItem(updateCartItem);
        
    }
    else{
        product.quantity=quantity;
        setcartItem([...cartItem,{...product}])
    }
    toast.success(`${qty} ${product.name} added to the cart `);
    }

    return(
        <Contex.Provider value={{
            showCart,
            setshowCart,
            cartItem,
            totalPrice,
            totalQuantity,
            qty,
            incQty,
            DecQty,
            onAdd
         }}>
               {children} 
        </Contex.Provider>
    )
}
export const useStateContext=()=>useContext(Contex);