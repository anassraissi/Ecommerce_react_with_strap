import toast from "react-hot-toast";
import product from "../sanitty/schemas/product";

const { createContext, useContext, useState } = require("react");

const Contex = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setshowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantity, settotalQuantity] = useState(0);
    const [qty, setqty] = useState(1);
    let foundProduct;
    let index;
    const incQty = () => {
        setqty((prev) => prev + 1);
    }
    const DecQty = () => {
        setqty((prev) => {
            return (prev - 1 < 0) ? 0 : prev - 1;
        });
    }
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => product._id == item._id)
        /** mnin ykon produit deja 3zalnah 9bel
         *  ghatzad ghi tamal lakhar, quantity dyal dak produit
         */
        if (checkProductInCart) {
            settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);  // zid price dyal produit
            settotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity)   // zid fquantity

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setcartItems(updatedCartItems);

        }
        else {
            product.quantity = quantity;
            setcartItems([...cartItems, { ...product }]);
            settotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity)  // zid fquantity
            settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        }
        toast.success(`${qty} ${product.name} added to the cart `);
        setqty(1);
    }

    const toggleCartItemQuantity=(id,value)=>{
       // ila bghit nmodifier fwast cartItem
        foundProduct=cartItems.find((item)=>item._id===id);  // njbad produit by id
        index=cartItems.findIndex((product)=>product._id==id); // njbad index
        const newCartItem=cartItems.filter((item)=> item._id!==id);
        if(value==='inc'){
            (index==0)? setcartItems([{...foundProduct,quantity:foundProduct.quantity+1},...newCartItem]) :
              setcartItems([...newCartItem,{...foundProduct,quantity:foundProduct.quantity+1}]) // nmodifier le produit 

            settotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)  // nmodifier total price
            settotalQuantity((prevTotalQuantity)=>prevTotalQuantity+1);  // nmodifier total quantity
            setqty((prev) => prev + 1);

        }
        else{
            if(foundProduct.quantity>1){  // n9es mn quantity ila kan quantity kbar mn wahed 
                
                (index==0)? setcartItems([{...foundProduct,quantity:foundProduct.quantity-1},...newCartItem]) :
                setcartItems([...newCartItem,{...foundProduct,quantity:foundProduct.quantity-1}]) // nmodifier le produit 
                /**
                 * modifier quantity price w quantity , produit
                */
               settotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
               settotalQuantity((prevTotalQuantity)=>prevTotalQuantity-1);
               setqty((prev) => prev - 1);

            }
        
        }
    }
    const onRemove=(product)=>{
        const foundProduct=cartItems.find((item)=>item._id===product._id);
        const newCartItem=cartItems.filter((item)=>item._id!==product._id);
        settotalPrice((prevTotalPrice)=>prevTotalPrice-(foundProduct.price*foundProduct.quantity))
        settotalQuantity((prevTotalQuantity)=>prevTotalQuantity-foundProduct.quantity);
        setcartItems(newCartItem);
    }

    return (
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
            toggleCartItemQuantity,
            setqty,
            qty,
            onRemove
        }}>
            {children}
        </Contex.Provider>
    )
}
export const useStateContext = () => useContext(Contex);