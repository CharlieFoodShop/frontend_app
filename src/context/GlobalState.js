import React, { useReducer } from "react";
import ShopContext from "./ShopContext";
import { shopReducer, ADD_PRODUCT, ADD_PRODUCT_BY_ONE, DELETE_PRODUCT_BY_ONE, REMOVE_PRODUCT, CLEAR_CART } from "./reducer";

const GlobalState = (props) => {
    const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });

    const addProductToCart = product => {
        dispatch({ type: ADD_PRODUCT, product: product });
    }

    const addProductToCartByOne = product => {
        dispatch({ type: ADD_PRODUCT_BY_ONE, product: product });
    }

    const deleteProductFromCartByOne = product => {
        dispatch({ type: DELETE_PRODUCT_BY_ONE, product: product });
    }

    const removeProductFromCart = product => {
        dispatch({ type: REMOVE_PRODUCT, product: product });
    }

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    }

    return (
        <ShopContext.Provider
            value={{
                cart: cartState.cart,
                addProductToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                addProductToCartByOne: addProductToCartByOne,
                deleteProductFromCartByOne: deleteProductFromCartByOne,
                clearCart: clearCart
            }}
        >
            {props.children}
        </ShopContext.Provider>
    );
}

export default GlobalState;