const IP_URL = "http://144.34.175.242/api/customer_api/";
const IP_URL_FOOD_SHOP = "http://144.34.175.242/api/customer_food_shop_api/";

// const IP_URL = "http://localhost:7000/customer_api/";
// const IP_URL_FOOD_SHOP = "http://localhost:7000/customer_food_shop_api/";

const CUSTOMER_SERVICE_PATH = {
    DEFAULT_URL: IP_URL,
    REGISTER_URL: IP_URL + "customer_register/",
    LOGIN_URL: IP_URL + "customer_login/",
    LOGOUT_URL: IP_URL + "customer_logout/",
    RESET_PASSWORD: IP_URL + "customer_password_reset/",
    GET_CUSTOMER_DETAIL: IP_URL + "customer_detail",
    UPDATE_CUSTOMER_PROFILE: IP_URL + "customer_update_profile",
    CUSTOMER_UPLOAD_AVATAR: IP_URL + "customer_upload_avatar",

    RANDOM_FOOD_SHOP_POP_UP: IP_URL_FOOD_SHOP + "get_random_food_shops"
};

export default CUSTOMER_SERVICE_PATH;