export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const ADD_PRODUCT_BY_ONE = "ADD_PRODUCT_BY_ONE";
export const DELETE_PRODUCT_BY_ONE = "DELETE_PRODUCT_BY_ONE";
export const CLEAR_CART = "CLEAR_CART";

const addProductToCart = (product, state) => {
    console.log("adding product", product);

    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
        item => item.food_item_id === product.food_item_id
    );

    if (updatedItemIndex < 0) {
        updatedCart.push(product);
    } else {
        const updatedItem = updatedCart[updatedItemIndex];
        updatedItem.quantity += product.quantity;
        updatedCart[updatedItemIndex] = updatedItem;
    }

    return { ...state, cart: updatedCart };
}

const addProductToCartByOne = (product, state) => {
    console.log("adding product by one", product);

    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
        item => item.food_item_id === product.food_item_id
    );

    if (updatedItemIndex >= 0) {
        const updatedItem = updatedCart[updatedItemIndex];
        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
    }

    return { ...state, cart: updatedCart };
}

const deleteProductFromCartByOne = (product, state) => {
    console.log("deleting product by one", product);

    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
        item => item.food_item_id === product.food_item_id
    );

    if (updatedItemIndex >= 0) {
        const updatedItem = updatedCart[updatedItemIndex];
        updatedItem.quantity--;
        if (updatedItem.quantity === 0) {
            updatedCart.splice(updatedItemIndex, 1);
        } else {
            updatedCart[updatedItemIndex] = updatedItem;
        }
    }

    return { ...state, cart: updatedCart };
}

const removeProductFromCart = (product, state) => {
    console.log("remove product: " + product);

    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
        item => item.food_item_id === product.food_item_id
    );

    if (updatedItemIndex >= 0) {
        updatedCart.splice(updatedItemIndex, 1);
    }

    return { ...state, cart: updatedCart };
}

const clearCart = (state) => {
    console.log('clear cart');

    const updatedCart = [];
    return { ...state, cart: updatedCart };
}

export const shopReducer = (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return addProductToCart(action.product, state);

        case ADD_PRODUCT_BY_ONE:
            return addProductToCartByOne(action.product, state);

        case DELETE_PRODUCT_BY_ONE:
            return deleteProductFromCartByOne(action.product, state);

        case REMOVE_PRODUCT:
            return removeProductFromCart(action.product, state);

        case CLEAR_CART:
            return clearCart(state);

        default:
            return state;
    }
}

