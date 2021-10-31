import React from "react";

export default React.createContext({
    cart: [],
    addProductToCart: product => { },
    addProductToCartByOne: product => { },
    deleteProductFromCartByOne: product => { },
    removeProductFromCart: product => { },
    clearCart: () => { }
});

/*


*/