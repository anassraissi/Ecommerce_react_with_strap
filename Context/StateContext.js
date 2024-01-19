import toast from "react-hot-toast";

const { createContext, useContext, useState } = require("react");

const Contex=createContext();

export const StateContext=({children})=>{
    const [showCart, setshowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState();
    const [totalQuantity, settotalQuantity] = useState(0);
    const [qty, setqty] = useState(1);
    const incQty=()=>{
        setqty((prev)=> prev +1);
    }
    const DecQty=()=>{
        setqty((prev)=>{
            return (prev-1<0)? 0: prev-1;
        });
    }
    const onAdd=(product,quantity)=>{
        const checkProductInCart=cartItems.find((item)=>product._id==item._id) 
        /** mnin ykon produit deja 3zalnah 9bel
         *  ghatzad ghi tamal lakhar, quantity dyal dak produit
         */
        if(checkProductInCart){
        settotalPrice((prevTotalPrice)=>prevTotalPrice+product.price*quantity);  // zid price dyal produit
        settotalQuantity((prevTotalQuantity)=>prevTotalQuantity+quantity)   // zid fquantity
        
        const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }
          })
        setcartItems(updatedCartItems);
        
    }
    else{
        product.quantity=quantity;
        setcartItems([...cartItems,{...product}]);
        settotalQuantity(quantity)
        settotalPrice(product.price*quantity);
    }
    toast.success(`${qty} ${product.name} added to the cart `);
    }

    return(
        <Contex.Provider value={{
            onAdd,
            showCart,
            setshowCart,
            cartItems,
            totalPrice,
            totalQuantity,
            qty,
            incQty,
            DecQty,
         }}>
               {children} 
        </Contex.Provider>
    )
}
export const useStateContext=()=>useContext(Contex);