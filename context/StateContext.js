import { createContext, useContext, useState, useEffect } from "react";
import {toast} from 'react-hot-toast' //for popup notification

const Context = createContext()

export const StateContext = ({children}) => {

    // const getLocalItems = () => {

    //     if (typeof window !== 'undefined'){
    //         const cart = localStorage.getItem('cart');
    //         console.log(cart);
      
    //         if(cart){
    //             return JSON.parse(localStorage.getItem('cart'))
    //         } else {
    //             return [];
    //         }
    //     }

    // }


    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([]) 
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(cartItems));
    // }, [cartItems])

    // console.log(cartItems)

    // foundProdct for current selected product
    let foundProduct;

    // index for the index of the current element
    let index;

    // to increase quantity and show in the cart 
    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    // to decrease quantity and show in the cart 
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1; //because we cannot go below 1    

            return prevQty - 1
        })
    }

    // when we click on add to cart, then this function fires, which takes the current product and amount of quantities
    //that we are adding
    const onAdd = (product, quantity) => {
        
        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        //checks if the product is already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        //if the product is already in the cart
        if(checkProductInCart) {
            
            //if we already have the item in the cart and again add that item to the cart, we have to make 
            //changes to the visual items in the cart items, so we update the cart items
            const updatedCartItems = cartItems.map((cartProduct) => {
                //it checks if the item we are adding again is one of the items in the cart, then it does not
                //add the item separately again, instead it keeps the rest of the products in the cart and
                //only increases the quantity of the same item  
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            //update the cart items
            setCartItems(updatedCartItems)
            


        } else { //if the item does not exist in the cart

            //set the chosen quantity of the product to that product quantity
            product.quantity = quantity;

            //add the previous items by spreading the array of objects and add new product by 
            //spreading the product object
            setCartItems([...cartItems, { ...product }])    
        }

        toast.success(`${qty} ${product.name} has been added to the cart.`)
    }


    // when we delete a product from the cart
    const onRemove = (product) => {

        // we have to know which current product we are updating / dealing with
        foundProduct = cartItems.find((item) => item._id === product._id)

        //then we have to update the cart items with a new cart item without the current product
        const newCartItems = cartItems.filter((item) => item._id !== product._id)

        //we then update the total cart price by subtracting the current product price from the total price
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)

        //then we update the total quantity by remvoving the current product quantity/quantities
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)

        //finally we update the cart items
        setCartItems(newCartItems)
    }


    // when we want to change quantity of specefic item in the cart
    const toggleCartItemQuantity = (id, value) => {

        //we search for the particular product that we wan to add to the cart
        foundProduct = cartItems.find((item) => item._id === id)
        
        // index of that clicked item in the cart items array
        index = cartItems.findIndex((product) => product._id === id)

        //creating a new cart items where we are keeping all the other items and deleting the specific product  
        //with the current id 
        const newCartItems = cartItems.filter((item) => item._id !== id)

        // are we incrementing or decrementing quantity
        if(value === 'inc') {

            //new product and spreading its properties with a updated quantity value , +1
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])

            //updating the total amount of price in the cart
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)

            //update the total quantity
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if(value === 'dec') {
            
            //if the product quantity is greater than 1 only then we will be able to 
            //decrease the quantity
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
                setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }


        }
    }

    console.log(cartItems);

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove
        }}>
            {children}
        </Context.Provider>
    )
}

//so that we can only import this function to use the context
export const useStateContext = () => useContext(Context); 